# Module 02 — How Tools Actually Get Executed

> **Goal of this module:** Dispel the magic around "the AI ran a command" or "the AI edited my file." Students must understand that **the model cannot do anything**. It can only emit text. A *separate program* (the harness) reads that text, executes real actions in a real environment, and feeds the results back.

---

## 2.1 The central misconception to kill

Students arrive believing the model "has access to" a terminal, files, the web. It does not.

> **The model emits text. The harness acts. Full stop.**

When Claude Code "reads your file," here's what literally happens:
1. The model emits text that *describes* a request to read a file.
2. The harness (a normal program running on your machine) parses that text.
3. **The harness** calls the operating system to read the file.
4. The harness inserts the file contents back into the context window.
5. The model, on its next turn, sees those contents as input.

The model never touched your disk. A Python/TypeScript program did — and it did so *because the model asked it to, in a format the program was watching for.*

---

## 2.2 A tool is three things

A "tool" (a.k.a. function calling) is a contract between the model and the harness. It consists of:

1. **A schema** — a machine-readable description of what the tool does and what arguments it takes (JSON Schema).
2. **An implementation** — actual code (a Python/JS function) that performs the action.
3. **A wiring convention** — how the model *requests* the tool and how the harness *returns* the result.

### The schema (what the model is told)

```json
{
  "name": "read_file",
  "description": "Read the contents of a file from the local filesystem. Use this when you need to see the current contents of a file before editing it.",
  "input_schema": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Absolute path to the file to read."
      }
    },
    "required": ["path"]
  }
}
```

This schema is **injected into the context window** alongside the system prompt. The model literally reads the list of available tools as part of its input. That's how it "knows" the tool exists — the same way it "knows" anything: it's in the context.

> **Design lesson (surfaces later in the course):** the `description` field is prompt engineering. A vague description ("gets a file") produces worse tool selection than a precise one ("Read a file. Use before editing. Do NOT use for directories."). Tool descriptions are part of the prompt.

### The implementation (what actually runs)

```python
def read_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()
```

An ordinary function. Nothing AI about it.

---

## 2.3 The wiring: request → execute → observe

Here is the complete loop in pseudocode. **This is the heart of the whole lecture.**

```
FUNCTION run_agent(user_message):
    context = [system_prompt, tool_schemas, user_message]

    LOOP:
        # 1. THINK — model predicts next tokens given everything so far
        response = model.predict(context)

        # 2. Did the model ask to use a tool?
        IF response contains a tool_call:
            tool_name = response.tool_call.name
            tool_args = response.tool_call.arguments      # JSON the model emitted

            # 3. ACT — the HARNESS executes the real function
            result = TOOLS[tool_name](**tool_args)

            # 4. OBSERVE — feed the result back into context
            context.append(response)          # the model's request
            context.append(result)            # the environment's answer

            # 5. loop again — model now "sees" the result and decides next step
            CONTINUE

        ELSE:
            # model produced a normal answer, no tool needed
            RETURN response
```

Trace it explicitly for students — *"Read `auth.ts` and tell me what it does"*:

```
┌──────────── ITERATION 1 ────────────┐
context = [system, tools, "Read auth.ts and tell me what it does"]
model emits:  tool_call → read_file(path="auth.ts")
harness runs: open("auth.ts").read()  →  "export function login()..."
context.append(the tool call)
context.append("export function login()...")   ← result goes back in
└─────────────────────────────────────┘
              │
              ▼
┌──────────── ITERATION 2 ────────────┐
context now includes the file contents.
model emits:  "This file defines a login() function that..."
no tool call → RETURN to user
└─────────────────────────────────────┘
```

**The key insight to hammer:** iteration 2 works only because the file contents are now *in the context window*. The model didn't "remember reading" the file — the harness put the bytes into its input. Callback to Module 01: the model is stateless; the harness carries state forward.

---

## 2.4 Modifying the environment (the scary part)

Reading is safe. The power — and danger — of agentic coding is tools that **change state**: writing files, running shell commands, making network calls.

```python
def write_file(path: str, content: str) -> str:
    with open(path, "w") as f:
        f.write(content)
    return f"Wrote {len(content)} bytes to {path}"

def run_bash(command: str) -> str:
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout + result.stderr
```

Once `run_bash` exists as a tool, the model can — by emitting the right JSON — cause **arbitrary commands to run on your machine**. This is exactly how Claude Code can install dependencies, run tests, and commit code.

This motivates two things you'll teach later:
- **Permissions / human-in-the-loop:** the harness can pause and ask the user to approve a tool call before executing it. The approval gate lives in the *harness*, not the model.
- **Sandboxing:** running the agent's actions in an isolated environment (container, scoped tokens, restricted filesystem) so a bad tool call can't do real damage.

```
        model emits write_file(...)
                    │
                    ▼
        ┌───────────────────────┐
        │  HARNESS PERMISSION    │  ← "Allow Claude to edit auth.ts? [y/N]"
        │  GATE                  │
        └───────────────────────┘
             │approved      │denied
             ▼              ▼
        execute         return "user denied"
                        (back into context)
```

Notice: even a *denial* goes back into the context as an observation. The model then reasons about the denial ("the user declined, let me suggest an alternative"). Everything is text going in and out of the window.

---

## 2.5 Two ways the model can "call" a tool

Worth showing students because they'll see both:

**(a) Structured tool calling (the mainstream approach).**
The API exposes a dedicated `tools` parameter. The model emits a structured `tool_use` block; the API guarantees valid routing. This is what the Anthropic and OpenAI APIs do.

**(b) Code-as-action (the emerging approach).**
Instead of emitting JSON, the model writes *actual code* (often Python) that calls the tools, and the harness executes that code. On complex tasks this can reduce the number of model round-trips substantially, because one code block can chain several tool calls together (loops, conditionals, intermediate variables) without returning to the model between each.

```python
# Instead of 4 separate JSON tool calls + 4 round trips,
# the model emits ONE code block:
files = list_dir("src/")
for f in files:
    if f.endswith(".test.js"):
        run_bash(f"npx jest {f}")
```

Mentioning both sets up the later "loop engineering" discussion nicely — different action representations change the shape of the loop.

---

## 2.6 Minimal end-to-end Python (optional live code)

If you want a runnable spine in class. Pedagogically, the *loop* matters more than the SDK details.

```python
import json, subprocess

# --- 1. the tool implementations ---
def read_file(path):  return open(path).read()
def write_file(path, content):
    open(path, "w").write(content); return f"wrote {path}"
def run_bash(command):
    r = subprocess.run(command, shell=True, capture_output=True, text=True)
    return r.stdout + r.stderr

TOOLS = {"read_file": read_file, "write_file": write_file, "run_bash": run_bash}

# --- 2. the schemas the model sees (abbreviated) ---
TOOL_SCHEMAS = [ ... ]   # JSON Schema blocks as in §2.2

# --- 3. the agent loop ---
def run_agent(user_message, model_client):
    context = [{"role": "user", "content": user_message}]
    while True:
        response = model_client.create(
            system="You are a coding assistant.",
            tools=TOOL_SCHEMAS,
            messages=context,
        )
        context.append({"role": "assistant", "content": response.content})

        tool_calls = [b for b in response.content if b.type == "tool_use"]
        if not tool_calls:
            return response                      # normal answer → done

        for call in tool_calls:
            result = TOOLS[call.name](**call.input)     # HARNESS executes
            context.append({
                "role": "user",
                "content": [{"type": "tool_result",
                             "tool_use_id": call.id,
                             "content": str(result)}],
            })
        # loop: model now sees results and continues
```

The three labeled sections map exactly to §2.2 (schema), §2.2 (implementation), §2.3 (wiring/loop).

---

## 2.7 Check-for-understanding

1. When Claude Code "runs your tests," which component actually invokes `jest` — the model or the harness?
2. Why does a denied tool call still get appended to the context?
3. What's the tradeoff between JSON tool-calling and code-as-action?
4. Where does the permission/approval logic live, and why can't it live inside the model?

---

## TODO / next-pass items
- [ ] Optional: wire §2.6 to the Qwen demo so students can watch an open-weights model drive the same loop.
- [ ] Add a deliberately failing tool call (bad path) to show error observations flowing back.

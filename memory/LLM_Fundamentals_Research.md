# Teaching LLM Fundamentals for AI-Assisted Coding: A Graduate Resource Guide

This curated guide provides the best educational resources for teaching LLM fundamentals to master's-level CS students in a graduate course on AI-assisted coding (vibe coding) at Northeastern University. The collection prioritizes visual explanations, hands-on implementations, and authoritative sources from leading educators including **Grant Sanderson (3Blue1Brown)**, **Andrej Karpathy**, **Jay Alammar**, and **Anthropic's engineering team**. Resources are organized by topic with suggested teaching sequences.

---

## Neural network foundations through visual learning

The most effective entry point for LLM education remains **3Blue1Brown's neural network series**, which builds mathematical intuition through stunning animations before students engage with code. Grant Sanderson's four-part foundation begins with "But what is a Neural Network?" (https://www.youtube.com/watch?v=aircAruvnKk), using handwritten digit recognition to explain neurons, layers, weights, and activations. The series progresses through "Gradient descent, how neural networks learn" (https://www.youtube.com/watch?v=IHZwWFHWa-w), "What is backpropagation really doing?" (https://www.youtube.com/watch?v=Ilg3gGewQ5U), and "Backpropagation calculus" (https://www.youtube.com/watch?v=tIeHLnjs5U8) for the full mathematical treatment graduate students need.

**Andrej Karpathy's "Neural Networks: Zero to Hero"** (https://karpathy.ai/zero-to-hero.html) provides the essential hands-on complement to 3Blue1Brown's visual approach. His "spelled-out intro to neural networks and backpropagation: building micrograd" (https://www.youtube.com/watch?v=VMj-3S1tku0) is ideal for students who learn through implementation—they build an autograd engine from scratch requiring only basic Python and high school calculus. Karpathy's GitHub repositories (micrograd, nanoGPT) serve as excellent assignment foundations.

For LLM training processes specifically, the **Hugging Face RLHF guide** (https://huggingface.co/blog/rlhf) breaks down the three-stage pipeline: pretraining, reward model training, and reinforcement learning fine-tuning. **Sebastian Raschka's newsletter** (https://magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives) provides regularly updated comparisons of RLHF alternatives including DPO and SimPO.

---

## Transformers and attention explained visually

3Blue1Brown's transformer content represents the gold standard for teaching attention mechanisms. "Transformers, the tech behind LLMs" (https://www.youtube.com/watch?v=wjZofJX0v4M) introduces the overall architecture and word embeddings, while "Attention in transformers, step-by-step" (https://www.youtube.com/watch?v=eMlx5fFNoYc) demystifies queries, keys, values, and multi-head attention—called "by far the clearest explanation" by multiple educators. The newer "How might LLMs store facts" (https://www.3blue1brown.com/lessons/mlp) addresses interpretability questions students inevitably raise.

**Karpathy's "Let's build GPT: from scratch, in code, spelled out"** (https://www.youtube.com/watch?v=kCc8FmEb1nY) is essential viewing for an AI-assisted coding course—it builds a complete GPT following the "Attention Is All You Need" paper in under two hours, explaining how models like GitHub Copilot work internally. The video covers tokenization, self-attention, multi-headed attention, positional encoding, residual connections, and discusses ChatGPT's training pipeline including RLHF.

**Jay Alammar's illustrated guides** provide the best static visual references for student review. "The Illustrated Transformer" (https://jalammar.github.io/illustrated-transformer/) has been featured in courses at Stanford, Harvard, MIT, and CMU, with feedback from the original paper's authors. His companion pieces on GPT-2 (https://jalammar.github.io/illustrated-gpt2/) and BERT (https://jalammar.github.io/illustrated-bert/) help students understand decoder vs. encoder architectures.

For implementation-focused learning, **Harvard NLP's "The Annotated Transformer"** (http://nlp.seas.harvard.edu/2018/04/03/attention.html) provides a line-by-line PyTorch implementation of the original paper in approximately 400 lines of library code—perfect for students to run as a working notebook.

---

## Tokenization and why it matters for code generation

**Karpathy's "Let's Build the GPT Tokenizer"** (https://www.youtube.com/watch?v=zduSFxRajkE) is the definitive resource, explaining why many LLM "weird behaviors" trace back to tokenization: difficulty with spelling, string reversal, arithmetic, and crucially for this course, Python indentation problems in GPT-2. The **fast.ai text conversion** (https://www.fast.ai/posts/2025-10-16-karpathy-tokenizers) allows students to follow along with inline code and hyperlinked video timestamps.

**Interactive tokenization tools are essential for classroom demonstrations**. Tiktokenizer (https://tiktokenizer.vercel.app/) visualizes tokenization in real-time across GPT-2, GPT-4, Claude, and Llama, showing students exactly how code tokenizes differently than prose and why GPT-4's improved whitespace handling yields **4x efficiency improvements** for Python compared to GPT-2. OpenAI's tiktoken library (https://github.com/openai/tiktoken) includes an `_educational` submodule specifically designed for teaching.

For sampling and temperature explanations, the technical deep-dive at peterchng.com (https://peterchng.com/blog/2023/05/02/token-selection-strategies-top-k-top-p-and-temperature/) provides mathematical formulas for temperature, top-k, and nucleus sampling that graduate students need. The framing of LLMs as "sophisticated autocomplete" versus RLHF-trained assistants is explored thoughtfully at https://www.harysdalvi.com/blog/llms-dont-predict-next-word/, providing intellectual depth for classroom debate about the gap between pretraining and instruction tuning.

Context window management resources from **IBM** (https://www.ibm.com/think/topics/context-window) and **DataCamp** (https://www.datacamp.com/blog/context-window) explain why LLMs are fundamentally "stateless" and how chat interfaces create the illusion of memory. Research on optimal context placement—information at the beginning or end of prompts outperforms the middle—appears in the Hopsworks guide (https://www.hopsworks.ai/dictionary/context-window-for-llms).

---

## Embeddings, vector databases, and RAG for code assistance

The **TensorFlow Embedding Projector** (https://projector.tensorflow.org/) is essential for in-class demonstrations—students can visualize semantic relationships in 3D, explore nearest neighbors, and build intuition for embedding spaces without writing code. **Google's Machine Learning Crash Course embeddings module** (https://developers.google.com/machine-learning/crash-course/embeddings) provides structured curriculum covering dense vector representations, word2vec, and contextual embeddings.

For code-specific embeddings directly relevant to this course, the **HuggingFace Cookbook's code search tutorial** (https://huggingface.co/learn/cookbook/en/code_search) demonstrates building semantic code search using both general NLP models and specialized code embeddings like jina-embeddings-v2-base-code. The seminal **code2vec paper** (https://arxiv.org/pdf/1803.09473) explains how code semantics can be captured through AST path decomposition—foundational for understanding why code embeddings face unique challenges compared to natural language.

**Vector database comparisons** from DataCamp (https://www.datacamp.com/blog/the-top-5-vector-databases) help students understand the landscape: Pinecone for managed simplicity, Weaviate for hybrid search, Chroma for prototyping, Qdrant for performance. **Pinecone's HNSW deep-dive** (https://www.pinecone.io/learn/series/faiss/hnsw/) provides the best available explanation of the dominant ANN algorithm for developers.

For RAG implementation, **LangChain's official tutorial** (https://python.langchain.com/docs/tutorials/rag/) achieves basic Q&A in approximately 40 lines of code. More critically for this course, **LangChain's code generation tutorial with RAG and self-correction** (https://langchain-ai.github.io/langgraph/tutorials/code_assistant/langgraph_code_assistant/) shows RAG applied specifically to code assistance with structured output and unit test validation. The **LangChain RAG-from-scratch notebook series** (https://github.com/langchain-ai/rag-from-scratch) with accompanying videos works well for flipped classroom approaches.

---

## Understanding hallucinations in code generation

The theoretical foundation for why hallucinations are fundamental rather than fixable comes from two papers. OpenAI researchers' "Why Language Models Hallucinate" (https://arxiv.org/abs/2509.04664) argues that hallucinations arise from training incentives that reward guessing over acknowledging uncertainty—accessible framing that connects to students' test-taking intuitions. "Hallucination is Inevitable" (https://arxiv.org/abs/2401.11817) uses learning theory to formally prove LLMs cannot learn all computable functions and will therefore inevitably hallucinate as general problem solvers.

**Code-specific hallucination research is essential reading for this course**. The ACM paper "LLM Hallucinations in Practical Code Generation" (https://arxiv.org/pdf/2409.20550) establishes a comprehensive taxonomy: Task Requirement Conflicts, **Factual Knowledge Conflicts (including API misuse at 20.41%)**, and Project Context Conflicts. The USENIX Security 2025 paper on **package hallucinations** (https://www.usenix.org/publications/loginonline/we-have-package-you-comprehensive-analysis-package-hallucinations-code) documents that coding models recommend non-existent packages **19.6% of the time**—a supply chain security vulnerability when attackers register malicious packages with hallucinated names.

**Benchmark limitations matter for setting realistic expectations**. HumanEval (https://github.com/openai/human-eval) is the foundational benchmark, but HumanEval Pro research (https://arxiv.org/abs/2412.21199) reveals a critical gap: o1-mini achieves **96.2% on basic HumanEval but only 76.2%** on self-invoking tasks requiring progressive reasoning. PythonSaga analysis (https://arxiv.org/html/2401.03855v4) shows HumanEval and MBPP are biased toward easy problems covering less than 53% of programming concepts.

For security concerns, Georgetown CSET's "Cybersecurity Risks of AI-Generated Code" (https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/) found **73% of manually-checked code samples contained vulnerabilities**. Veracode's analysis found only **55% of AI-generated code was secure** across 80 tasks—and security performance hasn't improved significantly even as models improve syntactically.

---

## Anthropic's engineering resources and documentation

**Anthropic's GitHub courses repository** (https://github.com/anthropics/courses) with 18,000+ stars provides classroom-ready curriculum: API Fundamentals, a 9-chapter Prompt Engineering Interactive Tutorial, Real World Prompting, Prompt Evaluations, and Tool Use guides. The **prompt engineering interactive tutorial** (https://github.com/anthropics/prompt-eng-interactive-tutorial) with 28,000+ stars includes exercises, an Example Playground, and answer key—designed for Haiku to minimize costs.

For interpretability—explaining why LLMs behave as they do—**"Mapping the Mind of a Large Language Model"** (https://www.anthropic.com/research/mapping-mind-language-model) describes finding millions of interpretable features in Claude 3 Sonnet using sparse autoencoders. **"Tracing the Thoughts of a Large Language Model"** (https://www.anthropic.com/research/tracing-thoughts-language-model) shows how interpretability can detect "faithful" versus "unfaithful" reasoning chains—critical for understanding when models genuinely reason versus confabulate.

The **Constitutional AI paper** (https://arxiv.org/abs/2212.08073) explains RLAIF (RL from AI Feedback), foundational to Claude's training. The **"Alignment Faking" research** (https://www.anthropic.com/research/alignment-faking) documents the first empirical example of an LLM strategically appearing aligned while maintaining different internal goals—essential for students to understand alignment challenges.

Anthropic's documentation at docs.anthropic.com covers practical prompt engineering: being clear and direct, multishot prompting, chain-of-thought, XML tags, system prompts, response prefilling, and extended thinking. The **Prompt Library** (https://docs.anthropic.com/en/resources/prompt-library/library) provides optimized examples for code generation, document analysis, and other tasks. Notably, Anthropic **publicly shares Claude.ai's system prompts** (https://docs.anthropic.com/en/release-notes/system-prompts)—valuable transparency for teaching prompt design.

---

## Best practices for trusting and verifying AI-generated code

The practical framework from Graphite (https://graphite.com/guides/when-to-trust-ai-code) provides actionable heuristics: **"Treat AI code like a junior developer's contribution."** Be skeptical when security is involved, logic matters, performance is critical, or licensing is unclear. Trust when logic is simple, solutions are known patterns, and outputs are easily verified.

GitHub's official Copilot research (https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/) found **53.2% greater likelihood of passing all unit tests** with Copilot, but the GitClear whitepaper provides essential counterpoint: analysis of 153 million changed lines of code found "disconcerting trends for maintainability" with code churn projected to double. The ScienceDirect study on Copilot (https://www.sciencedirect.com/science/article/pii/S095058492500076X) offers practical guidance: checking **4-5 solutions** is generally enough, and novel/difficult problems are unlikely to be solved.

The **OpenSSF Security-Focused Guide** (https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions) from the Open Source Security Foundation provides industry best practices for secure AI usage: input validation, memory safety, dependency verification with sample prompts for different languages. Zencoder's validation framework (https://zencoder.ai/blog/ai-code-generation-the-critical-role-of-human-validation) outlines multi-layer verification: syntax check → logical correctness → edge case handling → security scan → adherence to standards.

---

## Suggested curriculum structure for a 10-week course

**Weeks 1-2: Neural network foundations** — Assign 3Blue1Brown's neural network series alongside Karpathy's micrograd implementation. Students build mathematical intuition through visualization then reinforce through code.

**Weeks 3-4: Transformers and attention** — Use 3Blue1Brown's transformer videos, Jay Alammar's illustrated guides, and Karpathy's "Let's build GPT" for the essential code-along. Assign the original "Attention Is All You Need" paper.

**Weeks 5-6: Tokenization and context** — Demo with Tiktokenizer showing code vs. prose tokenization. Assign Karpathy's tokenizer video. Discuss temperature/sampling parameters and context window management strategies.

**Weeks 7-8: Embeddings and RAG** — Interactive demos with TensorFlow Embedding Projector. Build code search using HuggingFace tutorial. Implement basic RAG with LangChain, then extend to code-specific RAG using LangGraph.

**Weeks 9-10: Reliability and best practices** — Assign hallucination papers (ACM code hallucinations, package hallucinations). Review Anthropic's interpretability research. Develop class framework for when to trust AI-generated code. Capstone: Build RAG-powered code assistant with systematic verification.

---

## Key takeaways for students

LLMs are pattern completion systems that reward plausible-sounding outputs over acknowledged uncertainty—hallucinations are incentive problems, not bugs to be fixed. **API misuse accounts for roughly 20% of code hallucinations**, and non-existent package recommendations occur nearly 20% of the time. High benchmark scores don't guarantee real-world reliability: models achieving 96% on basic tasks may drop to 76% on multi-step reasoning. **40-73% of AI-generated code contains security vulnerabilities** across multiple studies. The proper mental model: AI coding assistants are highly capable junior developers whose work requires systematic review—trust the pattern, verify the specifics.
#!/usr/bin/env bash
#
# PreToolUse hook — CS 6983 classroom demo
# ----------------------------------------
# Wired up in .claude/settings.json, matcher "Bash", filtered to `npm run deploy`.
# Fires in the moment BETWEEN Claude deciding to run the deploy and the rsync
# actually happening.
#
# It does two separate things, and the difference is the whole lesson:
#
#   1. A SIDE EFFECT  — a macOS notification banner. Any hook event can do this.
#   2. A RETURN VALUE — JSON printed to stdout that changes what happens next.
#      ONLY PreToolUse can do this. It is the sole hook event with a veto.
#
# Hook input arrives as JSON on stdin:
#   {"session_id":"...","tool_name":"Bash","tool_input":{"command":"npm run deploy"}}
#
# Exit code 0 + JSON on stdout = "here is my decision."
# permissionDecision can be "allow" (skip the prompt), "deny" (block outright),
# or "ask" (make the human confirm). We use "ask" — this publishes to students.

set -uo pipefail

# Pull the command Claude is about to run out of the stdin payload.
CMD=$(jq -r '.tool_input.command // "unknown"')

# The `if` filter in settings.json is only a cheap pre-filter (npm commands, so
# we don't spawn bash on every single tool call). THIS is the authoritative check.
#
# Why not rely on the filter alone? Permission-rule prefixes like
# `Bash(npm run deploy:*)` match on token boundaries AND require at least one
# trailing token — so a bare `npm run deploy` slips straight past them. Verified
# the hard way. Matching here instead means one obvious place to reason about.
# Matches `npm run deploy`, `npm --prefix slides run deploy`, and
# `cd slides && npm run deploy` alike — anything that reaches the deploy script.
case "$CMD" in
  *"run deploy"*) ;;   # a real deploy — fall through and guard it
  *) exit 0 ;;         # anything else — stay silent, let it through
esac

# --- 1. The visible side effect -------------------------------------------
# NOT `display notification`. Banner notifications require the calling app
# (Script Editor / your terminal) to hold Notification permission in System
# Settings; without it macOS swallows the banner AND STILL EXITS 0, so the hook
# looks healthy while doing nothing. Verified broken on this machine.
#
# `display dialog` via System Events needs no such permission, and a big
# centered modal reads better from the back of a lecture hall anyway.
# `giving up after` guarantees we never block the deploy waiting on a click.
osascript -e 'tell application "System Events" to display dialog "Publishing to johnguerra.co/lectures/aiCoding_fall2026/

Students see this immediately." buttons {"OK"} default button 1 with title "🚨 Live deploy — PreToolUse hook fired" giving up after 5' >/dev/null 2>&1 || true

# Optional classroom flourish — uncomment for the audio cue:
# say "Deploying to the live server" 2>/dev/null || true

# --- 2. The veto ----------------------------------------------------------
# jq -n builds the JSON so we never hand-escape quotes.
jq -nc --arg cmd "$CMD" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "ask",
    permissionDecisionReason: ("Live deploy to johnguerra.co/lectures/aiCoding_fall2026/ — students see it immediately.\nCommand: " + $cmd)
  }
}'

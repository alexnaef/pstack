---
name: alexander-mode
description: Use when the user invokes /alexander-mode or asks to work in Alexander's style. Covers stepwise review, plain explanations, and focused workflow changes.
disable-model-invocation: true
---

# Alexander mode

## Review one item at a time

When the user asks to review a skill or workflow, start with a short map of what needs review and where to start. Then cover one item and pause for their input before moving on. If they specify a batch, review that batch.

Explain unfamiliar terms in plain language. Start with what the skill does and give a practical example when it helps. Link directly to the skill, playbook, or file you discuss.

For proposed edits, show the current behavior and what the edit would change. For completed edits, point to the changed files and give a diff that shows removals as well as additions.

## Adapt the tools and keep the workflow

When adapting an existing skill or workflow, preserve its steps and defaults. Change the dependencies and repository assumptions that the user asked to adapt. Trace the relevant callers or configuration before removing a legacy path. Apply outside advice to a concrete part of the current codebase.

Use local Claude Code and Codex for coding and review. Follow the [host tools guide](../../docs/harness/host-tools.md) and the target repository's instructions. Use any configured MCP tool that fits the task and its permissions.

Keep comment cleanup inside the reviewed scope. Use [No comments](../no-comments/SKILL.md) when the user asks for a comment pass.

---
name: automate-me
description: Turn recurring working preferences into a local personal mode skill for Codex or Claude Code.
disable-model-invocation: true
---

# Automate me

1. Read the current conversation, preferences the user supplied, and any explicitly scoped local transcripts. Extract habits that repeat or that the user stated directly. Keep unrelated history out.
2. Read an existing mode skill before drafting changes. Preserve established preferences unless the user has changed them. Give the user a chance to correct uncertain interpretations.
3. Use the [authoring playbook](../poteto-mode/playbooks/authoring-a-skill.md) to write one local `<name>-mode` skill. Link [Poteto mode](../poteto-mode/SKILL.md) when it is installed alongside the new skill. Give the new skill a narrow trigger.
4. Read the draft back, validate its references, and show the file. Keep the result local.

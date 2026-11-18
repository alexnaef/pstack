# Set up pstack

## Install the plugin

From the root of this checkout, use the current host's local plugin flow.

**Codex**

```sh
codex plugin marketplace add "$PWD"
codex plugin add pstack@pstack-local
```

**Claude Code**

```sh
claude --plugin-dir "$PWD/harness/pstack/claude-code"
```

These commands point at this checkout. For Claude Code, refresh the generated copy after editing the source with `node scripts/generate-pstack-harness-trees.mjs`.

## Pick your models

[Setup pstack](../../skills/setup-pstack/SKILL.md) can write workspace-local overrides. Ordinary work inherits the host. Arena and Interrogate can use both providers when the local runners are available and authorized. See [local runners](../../skills/poteto-mode/references/local-runners.md).

## Run your first task

Ask the host to use the Poteto mode skill and give it a checkable goal.

```text
Use poteto-mode to add a --json flag to this command. Verify the new output and confirm the existing text output is byte-identical.
```

A normal run ends with a verified local patch and its evidence. The [verification guide](./06-verify-and-ship.md) explains how to add a repeatable local check.

Next: [Route work through Poteto mode](./02-poteto-mode.md).

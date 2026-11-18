# Run a longer task locally

Use the [Autonomous run playbook](../../skills/poteto-mode/playbooks/autonomous-run.md) with a finish condition the current session can check. Give the agent a local worktree and a time or experiment budget. Keep the machine and session running while it works.

```text
Use poteto-mode to migrate the callers. Stop when the local migration check finds zero old callers. Keep each verified change separate and log the choices.
```

[Show me your work](../../skills/show-me-your-work/SKILL.md) keeps a decision log with evidence for each significant step. On pause, the [Pause safely playbook](../../skills/poteto-mode/playbooks/pause-safely.md) leaves a checkpoint and a resume note for [Session pickup](../../skills/poteto-mode/playbooks/session-pickup.md).

Next: [Apply the principles](./08-principles.md).

# pstack in Claude Code

Load the generated package with `claude --plugin-dir /path/to/harness/pstack/claude-code`
from the target project. Use the `pstack`-prefixed command where exposed. Read
[Host tools](host-tools.md) for the common mappings.

Use Claude Code's local agent and worktree tools when permitted. Map a Claude
model alias and effort to fields exposed by the current host. A Codex seat uses
a permitted local Codex runner, if available. If it cannot run, report the
missing seat rather than treating a Claude worker as Codex.

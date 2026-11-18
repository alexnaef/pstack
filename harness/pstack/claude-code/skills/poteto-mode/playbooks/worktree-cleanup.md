### Worktree cleanup

1. Run the [local worktree audit](../scripts/worktree-audit.sh) with the intended base ref. Its classification comes from local refs and file status. A squash merge may need a manual comparison.
2. Cross-check which worktrees are in use. Use the current session and user-provided local context. Hold worktrees in use, locked, dirty, or of uncertain status.
3. When cleanup is requested, remove only confirmed unused, clean, merged worktrees with `git worktree remove <path>`. Use the exact paths from the audit. Preserve branches and local changes. For deletion beyond that scope, show what would be lost and ask first.
4. Re-list the worktrees and report what was removed and what needs attention.

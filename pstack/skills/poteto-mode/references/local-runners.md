# Local Codex and Claude runners

Run the work on the current machine. Model calls use the signed-in Codex or Claude service. Project commands, files, and worktrees stay local. Follow the user's scope, repository instructions, and host permissions.

## Choose a runner

- The supported runners are `codex` and `claude`. `inherit` means the current runner, when it is one of those two. Detect the actual host from the current session. Treat unknown providers as unavailable.
- Prefer the host's native local subagent when it can run the selected provider with the needed isolation. To use the other provider, require its installed local CLI, an authorized session, and a way to run it within the same permissions. A CLI's presence alone does not establish availability.
- For a CLI runner, use the installed command's help for supported options. Codex uses `codex exec` and Claude Code uses `claude --print`. Pass the brief as data to the CLI, never as shell code. Scope the working directory, allowed tools, and permissions to the task. Keep approvals and sandbox protections in place.
- Start each writing worker in its own local worktree or scratch directory. A judge gets read-only access to the brief, rubric, and candidates. If the runner cannot respect that access, skip it.
- Retry only within the same selected provider or fall back as the calling skill specifies. Never install, sign in, or select another provider as a fallback. Report failed seats and the provider that actually ran.
- If delegation is disabled by the host or task, keep the work in the current session. Do not use a subprocess to bypass that restriction.

## Role defaults

Read `.pstack/models.json` from the target workspace if it exists. See [Setup pstack](../../setup-pstack/SKILL.md) for the keys. Apply the allowlist even when reading existing configuration.

Ordinary work inherits the host. The Arena candidate and judge pools and Interrogate reviewer pool each default to `["codex", "claude"]`. The judge must come from the opposite provider to the coordinator. Separate workers from one provider can still be independent attempts, but that is not a cross-provider review.

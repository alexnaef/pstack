# Host tools for Codex and Claude Code

Preserve the playbook's steps and the repository's instructions. Run coding
agents locally through Codex with OpenAI models or Claude Code with Anthropic
models. Use the tools available in the active host, including configured MCP
tools. The runner and model restriction applies to coding and review agents.

| Playbook term | How to do it |
|---|---|
| Local subagent or workstream worker | Prefer the active host's permitted delegation tools. Use `codex exec` or `claude -p` from the worker's checkout for a seat on the other host when authorized. Preserve the task's tool and write permissions. Give each writing worker a separate worktree, the kickoff, and `worker.md`. Supply the specialist brief if the host cannot address the named agent. If delegation is unavailable, work in the current session and distinguish self-verification from independent review. |
| Control skill | Use the project's verification skill or a permitted browser, desktop, terminal, or MCP tool on the same product surface. |
| Code cleanup before commit | Review the scoped diff for redundancies, unrelated changes, and misleading comments. Run the bundled `no-comments` pass as directed. |
| Watch or loop | Use the host's available session loop or a bounded watcher for the named local process, CI check, or GitHub PR. Preserve the finish condition, polling interval, and operator stop. Use the bundled PR watcher for GitHub where the playbook calls for it. |
| Skill authoring | Use the host's skill authoring workflow. Project skills live in `.agents/skills` for Codex and `.claude/skills` for Claude Code. |
| Transcript | Use the exact current-project transcript surfaced by the host, or one the user provides. Stay within the current project and scope. |
| Merge or land a PR | Use the target repository's release procedure when it has one, such as a `merge-and-release` skill or a release runbook named in `AGENTS.md`. Follow the [landing reference](../../skills/poteto-mode/references/landing.md). Otherwise use `gh pr merge` as the playbook says. |
| Model role | Read `.pstack/models.md` in the target repository. Validate each configured model and fallback before running it. Use the selected host's available model list to check the model and provider. Skip unsupported entries and use the playbook's fallback with an allowed runner. `codex` and `claude` select the corresponding host's default model. `opus` and `fable` select the Claude Code aliases unless a matching model is explicitly pinned. Map parenthesized effort to the runner's effort setting. `auto` and `inherit-parent` use the current model when it meets the same requirements. |

Read the target checkout's `AGENTS.md` before starting work and pass its path
to delegates. Its database, deployment, and interaction rules apply to every
playbook step. The target repository's runtime and product model choices are
separate from pstack worker models.

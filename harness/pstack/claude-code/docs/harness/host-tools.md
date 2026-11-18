# Host tools for Codex and Claude Code

Preserve the playbook's steps and the repository's instructions. Use the tools
available in the active host, including configured MCP tools. This fork excludes
Cursor and SpaceX/xAI products, including their hosted agents, models, review
bots, PR tooling, webhooks, plugins, and automations. Mentions in source
attribution or an existing GitHub comment are reference material.

| Playbook term | How to do it |
|---|---|
| Task, local subagent, or Project worker | Use permitted Codex or Claude Code delegation. Give each writing worker a separate worktree, the kickoff, and `worker.md`. Supply the specialist brief if the host cannot address the named agent. If delegation is unavailable, work in the current session and distinguish self-verification from independent review. |
| Control skill | Use the project's verification skill or a permitted browser, desktop, terminal, or MCP tool on the same product surface. |
| Code cleanup before commit | Review the scoped diff for redundancies, unrelated changes, and misleading comments. Run the bundled `no-comments` pass as directed. |
| Watch or loop | Use the host's available session loop or a bounded watcher for the named local process, CI check, or GitHub PR. Preserve the finish condition, polling interval, and operator stop. Use the bundled PR watcher for GitHub where the playbook calls for it. |
| Skill authoring | Use the host's skill authoring workflow. Project skills live in `.agents/skills` for Codex and `.claude/skills` for Claude Code. |
| Transcript | Use the exact current-project transcript surfaced by the host, or one the user provides. Stay within the current project and scope. |
| Model role | Read `.pstack/models.md` in the target repository. A provider label `codex` or `claude` selects that host's session/default model. Verify explicit model names for the selected host and preserve effort where supported. A second provider needs an available, authorized local runner and the same task permissions. |

Read the target checkout's `AGENTS.md` before starting work and pass its path
to delegates. On Fise, follow its verified Supabase TestDB CLI path, Enterall MCP
discovery, board interaction boundaries, and GitHub/release runbooks. Fise's
runtime pins and product model choices are separate from pstack worker models.

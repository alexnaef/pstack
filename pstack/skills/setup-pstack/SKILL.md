---
name: setup-pstack
description: Configure pstack's local Codex and Claude roles. Use to set Arena or Interrogate panels, or choose the runner for delegated work.
---

# Setup pstack

Read [local runners](../poteto-mode/references/local-runners.md). The workflow works without a config file. When the user wants overrides, write `.pstack/models.json` at the target workspace root.

1. Identify the host and the locally available runners. Use Codex and Claude only. A CLI being on the path does not prove it is signed in or usable within this session.
2. Read the existing config, if any. Keep valid entries the user wants. Drop unsupported runners from managed roles and report the changes.
3. Use the defaults below for missing roles. For a requested override, choose only `codex`, `claude`, or `inherit`. A judging pool accepts only explicit providers. Preserve order and duplicates in candidate and reviewer lists. Preserve unrelated workspace configuration.
4. Write valid JSON, read it back, and report the effective choices. The runner uses its own session model and reasoning settings.

```json
{
  "worker": "inherit",
  "arenaRunners": ["codex", "claude"],
  "arenaJudges": ["codex", "claude"],
  "interrogateReviewers": ["codex", "claude"]
}
```

`worker` is the default for delegated implementation and Swarm. Arena and Interrogate read their own lists. If a listed provider cannot run, follow that skill's fallback and say which provider actually ran. Setup changes the workspace file only.

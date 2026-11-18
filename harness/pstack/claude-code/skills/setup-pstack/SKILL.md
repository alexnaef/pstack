---
name: setup-pstack
description: Configure which models pstack uses per role and at what reasoning budget. Detects your available models and writes a project-local rule that overrides the skill defaults. Use for /setup-pstack, "configure pstack models", "pstack budget", or changing pstack's model choices.
---

# Setup pstack

Read [Host tools](../../docs/harness/host-tools.md) for host and project mappings.

Write `.pstack/models.md`, a project-local rule that sets pstack's model per role.

## Steps

### 1. Detect available models

Check the available model lists on local Codex and Claude Code runners. Use the active host's delegation tool for its available selectors. The labels `codex` and `claude` select those hosts' defaults if available. If you cannot detect any models, ask the user which supported models they have access to. Verify explicit selectors before writing them. `inherit-parent` and `auto` are available when the current session already runs on a supported model.

### 2. Load current state

The default role-to-model mapping is the rule shape shown in step 5 below. If `.pstack/models.md` already exists, read it and treat its `# budget` line and its role values as the current choices. Otherwise start from those defaults. A line whose role is not in step 5, such as `hardest tasks`, `architect runners`, `reflect tooling`, or `why investigators`, is from a retired role. Drop it.

Discard entries that use unsupported runners or model providers, and report them. Preserve supported per-role choices and effort settings, including `inherit-parent` and `auto` when supported. Convert an older model selector if the same model and effort are available under a native name. Use the active host's verified equivalent or inherit the session for an unavailable default. Show unavailable explicit choices for correction.

### 3. Budget, map, and confirm

**(a) Ask for a budget.** Prefer AskQuestion over free text. Offer these three options with these exact labels, and name the current budget when the rule records one. With no rule, say that `large` matches the skill defaults.

- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning`

**(b) Apply it.** Build the working table from the skill defaults. On a rerun, keep each role's chosen model family, panel list, or alias. Treat Fable and Opus as separate families. `large` keeps each role's default effort, `medium` lowers it one step, and `small` lowers it two, on the ladder `xhigh` > `high` > `medium` > `low`. Stop at `low`. For example, `medium` changes `opus (xhigh)` to `opus (high)` and `opus (high)` to `opus (medium)`. Pass effort separately from the model selector. If the runner cannot set the target effort, use the highest supported effort at or below it in the same family or mark the role as needing a choice. `inherit-parent` and `auto` keep the parent's model and settings.

**(c) Show the roles and confirm.** Show every role with its model, marking any real slug not in the detected set as needing a choice. Also list each line step 2 dropped. Ask whether to accept as-is or change specific roles, offering the detected models at `xhigh` or below plus the applicable provider aliases and `inherit-parent` or `auto` (both mean: this role runs on the parent chat model, which is how Auto users stay on Auto) as the options. Prefer AskQuestion over free text. For panel roles (arena runners, interrogate reviewers) the value is a list, and one subagent runs per entry, alias entries included, so the list length sets the count. `arena cross-judge pool` is also a list, but Arena runs one judge. It tries only values from a vendor other than the parent's, in list order, so order it by preference. Fable and the other Claude models are one vendor. An `inherit-parent` or `auto` value never judges. `swarm workers` is the default model for every worker unless a race or comparison assigns another model per arm.

### 4. Validate

Each explicit model must be available on its local Codex or Claude Code runner and at `xhigh` or below. Verify provider aliases at execution. `inherit-parent` and `auto` require a supported parent model. If a chosen model is unavailable, stop and ask again.

### 5. Write the rule

Write `.pstack/models.md` with a `# budget` line with the chosen label and the effort that label names, and one line per role, using the same labels poteto-mode uses. Overwrite the whole file so re-runs stay idempotent. Shape:

```
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` uses the supported parent chat model. Alias entries in a panel still count toward its size.
# budget: large (xhigh)
feature, refactoring: opus (xhigh)
bug-fix: opus (xhigh)
perf-issue: opus (xhigh)
hillclimb: opus (xhigh)
judgment and prose: opus (xhigh)
arena runners: fable (high), opus (high), codex
arena cross-judge pool: opus (high), codex
swarm workers: opus (high)
interrogate reviewers: fable (high), opus (high), codex
```

### 6. Confirm

Tell the user the rule was written and that it applies to new sessions. Re-running this skill updates it.

### 7. Offer a verification skill (optional)

Check whether the project has a way to drive the real app for proof (a `verify-*` skill, or an existing harness). If not, offer once: "want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /create-verification-skill." On yes, invoke `/create-verification-skill` (resolves wherever pstack is installed: workspace, user, or plugin). On no, move on without pushing.

### 8. Offer a formal verification skill (optional)

Check whether the project already has a formal verification skill (a project skill that runs a model checker, a proof, or another verifier against the code). If not, offer once: "want a formal verification skill, so agents can prove a key property of your code holds in every case in scope, not only the cases tests reach? I can generate one with /create-formal-verification-skill." On yes, invoke `/create-formal-verification-skill` (resolves wherever pstack is installed: workspace, user, or plugin). On no, move on without pushing.

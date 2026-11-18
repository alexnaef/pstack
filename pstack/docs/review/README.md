# Pstack review

Upstream snapshot: [`5692c3d88a42`](https://github.com/cursor/plugins/tree/5692c3d88a42576f3b21bf09e628de719af50885/pstack).

Review each component together. Record what it does, what it needs from its host,
and whether to keep, adapt, or omit it. Preserve behavior and attribution where it
fits. Run the smallest check that demonstrates each change.

Scope: 58 core skills (including 24 principles), 22 playbooks, two agents,
three optional Benny skills, plus the worker brief, manifests, host adapter
and supporting files. Review support code function by function with its owning
component. Fixtures and generated copies are checked against their source.

## Item 1 · Poteto mode

The router selects a playbook, loads the relevant skills, and checks that
the work ends with evidence. It used to assume Cursor's agent tools, model IDs,
verification kit, and a PR at the end of normal implementation.

**Decision:** a plain fix ends with a verified local patch. Opening a PR
requires GitHub delivery to be in scope. The delivery rule takes precedence
over PR steps in playbooks and travels with delegated work.

The router now uses available host tools, inherits the session model by default,
and runs in the current chat when delegation is unavailable. Follow-up reviews
will replace the corresponding Cursor-specific steps in each downstream file.

### Expected behavior

| Prompt or condition | Result |
|---|---|
| Fix a bug | Bug-fix playbook, reproduce and verify locally, report evidence |
| Fix a bug and open a PR | Same verification, then the PR workflow within the repository's rules |
| Tell me the status of a PR | Read-only PR check |
| Run until done | Continue within the same delivery scope |
| Host cannot delegate | Continue in the current chat and disclose any independent check that could not run |

## Review order

| # | Type | Component | Status |
|---:|---|---|---|
| 1 | Router | [`poteto-mode`](../../skills/poteto-mode/SKILL.md) | Changed. Review below. |
| 2 | Playbook | [`bug-fix.md`](../../skills/poteto-mode/playbooks/bug-fix.md) | Next |
| 3 | Delegate brief | [`worker.md`](../../skills/poteto-mode/worker.md) | Pending |
| 4 | Playbook | [`opening-a-pr.md`](../../skills/poteto-mode/playbooks/opening-a-pr.md) | Pending |
| 5 | Skill | [`setup-pstack`](../../skills/setup-pstack/SKILL.md) | Pending |
| 6 | Agent | [`poteto-agent.md`](../../agents/poteto-agent.md) | Pending |
| 7 | Manifest | [`.cursor-plugin/plugin.json`](../../.cursor-plugin/plugin.json) | Pending |
| 8 | Agent | [`comment-sicko.md`](../../agents/comment-sicko.md) | Pending |
| 9 | Optional automation skill | [`reproduce-and-fix-issues`](../../automations/benny/skills/reproduce-and-fix-issues/SKILL.md) | Pending |
| 10 | Optional automation skill | [`setup-benny`](../../automations/benny/skills/setup-benny/SKILL.md) | Pending |
| 11 | Optional automation skill | [`triage-issue-reports`](../../automations/benny/skills/triage-issue-reports/SKILL.md) | Pending |
| 12 | Host adapter | [`claude-code.md`](../../docs/harness/claude-code.md) | Pending |
| 13 | Manifest | [`plugin.json`](../../plugin.json) | Pending |
| 14 | Skill | [`architect`](../../skills/architect/SKILL.md) | Pending |
| 15 | Skill | [`arena`](../../skills/arena/SKILL.md) | Pending |
| 16 | Skill | [`automate-me`](../../skills/automate-me/SKILL.md) | Pending |
| 17 | Skill | [`benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) | Pending |
| 18 | Skill | [`blast-radius`](../../skills/blast-radius/SKILL.md) | Pending |
| 19 | Skill | [`bro`](../../skills/bro/SKILL.md) | Pending |
| 20 | Skill | [`correct`](../../skills/correct/SKILL.md) | Pending |
| 21 | Skill | [`create-formal-verification-skill`](../../skills/create-formal-verification-skill/SKILL.md) | Pending |
| 22 | Skill | [`create-verification-skill`](../../skills/create-verification-skill/SKILL.md) | Pending |
| 23 | Skill | [`figure-it-out`](../../skills/figure-it-out/SKILL.md) | Pending |
| 24 | Skill | [`how`](../../skills/how/SKILL.md) | Pending |
| 25 | Skill | [`in-your-own-words`](../../skills/in-your-own-words/SKILL.md) | Pending |
| 26 | Skill | [`interrogate`](../../skills/interrogate/SKILL.md) | Pending |
| 27 | Skill | [`ketchup-video`](../../skills/ketchup-video/SKILL.md) | Pending |
| 28 | Skill | [`ketchup`](../../skills/ketchup/SKILL.md) | Pending |
| 29 | Skill | [`maintain-formal-verification-skill`](../../skills/maintain-formal-verification-skill/SKILL.md) | Pending |
| 30 | Skill | [`maintain-verification-skill`](../../skills/maintain-verification-skill/SKILL.md) | Pending |
| 31 | Skill | [`make-bot-ui`](../../skills/make-bot-ui/SKILL.md) | Pending |
| 32 | Skill | [`no-comments`](../../skills/no-comments/SKILL.md) | Pending |
| 33 | Skill | [`poteto-help`](../../skills/poteto-help/SKILL.md) | Pending |
| 34 | Playbook | [`authoring-a-skill.md`](../../skills/poteto-mode/playbooks/authoring-a-skill.md) | Pending |
| 35 | Playbook | [`autonomous-run.md`](../../skills/poteto-mode/playbooks/autonomous-run.md) | Pending |
| 36 | Playbook | [`autopilot-full.md`](../../skills/poteto-mode/playbooks/autopilot-full.md) | Pending |
| 37 | Playbook | [`autopilot-stack.md`](../../skills/poteto-mode/playbooks/autopilot-stack.md) | Pending |
| 38 | Playbook | [`babysit.md`](../../skills/poteto-mode/playbooks/babysit.md) | Pending |
| 39 | Playbook | [`eval.md`](../../skills/poteto-mode/playbooks/eval.md) | Pending |
| 40 | Playbook | [`feature.md`](../../skills/poteto-mode/playbooks/feature.md) | Pending |
| 41 | Playbook | [`hillclimb.md`](../../skills/poteto-mode/playbooks/hillclimb.md) | Pending |
| 42 | Playbook | [`investigation.md`](../../skills/poteto-mode/playbooks/investigation.md) | Pending |
| 43 | Playbook | [`multi-phase-plan.md`](../../skills/poteto-mode/playbooks/multi-phase-plan.md) | Pending |
| 44 | Playbook | [`pause-safely.md`](../../skills/poteto-mode/playbooks/pause-safely.md) | Pending |
| 45 | Playbook | [`perf-issue.md`](../../skills/poteto-mode/playbooks/perf-issue.md) | Pending |
| 46 | Playbook | [`prototype.md`](../../skills/poteto-mode/playbooks/prototype.md) | Pending |
| 47 | Playbook | [`refactoring.md`](../../skills/poteto-mode/playbooks/refactoring.md) | Pending |
| 48 | Playbook | [`runtime-forensics.md`](../../skills/poteto-mode/playbooks/runtime-forensics.md) | Pending |
| 49 | Playbook | [`session-pickup.md`](../../skills/poteto-mode/playbooks/session-pickup.md) | Pending |
| 50 | Playbook | [`shipping.md`](../../skills/poteto-mode/playbooks/shipping.md) | Pending |
| 51 | Playbook | [`trace-forensics.md`](../../skills/poteto-mode/playbooks/trace-forensics.md) | Pending |
| 52 | Playbook | [`visual-parity.md`](../../skills/poteto-mode/playbooks/visual-parity.md) | Pending |
| 53 | Playbook | [`worktree-cleanup.md`](../../skills/poteto-mode/playbooks/worktree-cleanup.md) | Pending |
| 54 | Principle | [`principle-attack-the-premise`](../../skills/principle-attack-the-premise/SKILL.md) | Pending |
| 55 | Principle | [`principle-boundary-discipline`](../../skills/principle-boundary-discipline/SKILL.md) | Pending |
| 56 | Principle | [`principle-build-the-lever`](../../skills/principle-build-the-lever/SKILL.md) | Pending |
| 57 | Principle | [`principle-encode-lessons-in-structure`](../../skills/principle-encode-lessons-in-structure/SKILL.md) | Pending |
| 58 | Principle | [`principle-exhaust-the-design-space`](../../skills/principle-exhaust-the-design-space/SKILL.md) | Pending |
| 59 | Principle | [`principle-experience-first`](../../skills/principle-experience-first/SKILL.md) | Pending |
| 60 | Principle | [`principle-explain-the-number`](../../skills/principle-explain-the-number/SKILL.md) | Pending |
| 61 | Principle | [`principle-fix-root-causes`](../../skills/principle-fix-root-causes/SKILL.md) | Pending |
| 62 | Principle | [`principle-foundational-thinking`](../../skills/principle-foundational-thinking/SKILL.md) | Pending |
| 63 | Principle | [`principle-guard-the-context-window`](../../skills/principle-guard-the-context-window/SKILL.md) | Pending |
| 64 | Principle | [`principle-laziness-protocol`](../../skills/principle-laziness-protocol/SKILL.md) | Pending |
| 65 | Principle | [`principle-make-operations-idempotent`](../../skills/principle-make-operations-idempotent/SKILL.md) | Pending |
| 66 | Principle | [`principle-migrate-callers-then-delete-legacy-apis`](../../skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) | Pending |
| 67 | Principle | [`principle-minimize-reader-load`](../../skills/principle-minimize-reader-load/SKILL.md) | Pending |
| 68 | Principle | [`principle-model-the-domain`](../../skills/principle-model-the-domain/SKILL.md) | Pending |
| 69 | Principle | [`principle-never-block-on-the-human`](../../skills/principle-never-block-on-the-human/SKILL.md) | Pending |
| 70 | Principle | [`principle-outcome-oriented-execution`](../../skills/principle-outcome-oriented-execution/SKILL.md) | Pending |
| 71 | Principle | [`principle-prove-it-works`](../../skills/principle-prove-it-works/SKILL.md) | Pending |
| 72 | Principle | [`principle-redesign-from-first-principles`](../../skills/principle-redesign-from-first-principles/SKILL.md) | Pending |
| 73 | Principle | [`principle-separate-before-serializing-shared-state`](../../skills/principle-separate-before-serializing-shared-state/SKILL.md) | Pending |
| 74 | Principle | [`principle-sequence-verifiable-units`](../../skills/principle-sequence-verifiable-units/SKILL.md) | Pending |
| 75 | Principle | [`principle-subtract-before-you-add`](../../skills/principle-subtract-before-you-add/SKILL.md) | Pending |
| 76 | Principle | [`principle-test-behavior-not-implementation`](../../skills/principle-test-behavior-not-implementation/SKILL.md) | Pending |
| 77 | Principle | [`principle-type-system-discipline`](../../skills/principle-type-system-discipline/SKILL.md) | Pending |
| 78 | Skill | [`recall`](../../skills/recall/SKILL.md) | Pending |
| 79 | Skill | [`reflect`](../../skills/reflect/SKILL.md) | Pending |
| 80 | Skill | [`sharpen`](../../skills/sharpen/SKILL.md) | Pending |
| 81 | Skill | [`show-me-your-work`](../../skills/show-me-your-work/SKILL.md) | Pending |
| 82 | Skill | [`statechart`](../../skills/statechart/SKILL.md) | Pending |
| 83 | Skill | [`swarm`](../../skills/swarm/SKILL.md) | Pending |
| 84 | Skill | [`tdd`](../../skills/tdd/SKILL.md) | Pending |
| 85 | Skill | [`teach`](../../skills/teach/SKILL.md) | Pending |
| 86 | Skill | [`technical-writing`](../../skills/technical-writing/SKILL.md) | Pending |
| 87 | Skill | [`typescript-best-practices`](../../skills/typescript-best-practices/SKILL.md) | Pending |
| 88 | Skill | [`unslop`](../../skills/unslop/SKILL.md) | Pending |
| 89 | Skill | [`why`](../../skills/why/SKILL.md) | Pending |

## Supporting source

Inspect the implementation and tests with the component that uses them.
The generator and docs checker belong to packaging. Generated host copies
and test fixtures are verified with their generators and tests.

| Component | File |
|---|---|
| Router helpers | [`poteto-mode/scripts/bootstrap.ts`](../../skills/poteto-mode/scripts/bootstrap.ts) |
| Router helpers | [`poteto-mode/scripts/bun.lock`](../../skills/poteto-mode/scripts/bun.lock) |
| Router helpers | [`poteto-mode/scripts/package.json`](../../skills/poteto-mode/scripts/package.json) |
| PR watcher | [`poteto-mode/scripts/watch-pr/cli.test.ts`](../../skills/poteto-mode/scripts/watch-pr/cli.test.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/cli.ts`](../../skills/poteto-mode/scripts/watch-pr/cli.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/fakes.test-helper.ts`](../../skills/poteto-mode/scripts/watch-pr/fakes.test-helper.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/github.test.ts`](../../skills/poteto-mode/scripts/watch-pr/github.test.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/github.ts`](../../skills/poteto-mode/scripts/watch-pr/github.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/policy.test.ts`](../../skills/poteto-mode/scripts/watch-pr/policy.test.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/policy.ts`](../../skills/poteto-mode/scripts/watch-pr/policy.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/render.ts`](../../skills/poteto-mode/scripts/watch-pr/render.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/tsconfig.json`](../../skills/poteto-mode/scripts/watch-pr/tsconfig.json) |
| PR watcher | [`poteto-mode/scripts/watch-pr/types.compile.ts`](../../skills/poteto-mode/scripts/watch-pr/types.compile.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/types.ts`](../../skills/poteto-mode/scripts/watch-pr/types.ts) |
| PR watcher | [`poteto-mode/scripts/watch-pr/watch-pr`](../../skills/poteto-mode/scripts/watch-pr/watch-pr) |
| Worktree cleanup | [`poteto-mode/scripts/worktree-audit.sh`](../../skills/poteto-mode/scripts/worktree-audit.sh) |
| Decision log | [`show-me-your-work/scripts/log.sh`](../../skills/show-me-your-work/scripts/log.sh) |
| Statechart | [`statechart/scripts/backends/cfg.ts`](../../skills/statechart/scripts/backends/cfg.ts) |
| Statechart | [`statechart/scripts/backends/mermaid.ts`](../../skills/statechart/scripts/backends/mermaid.ts) |
| Statechart | [`statechart/scripts/backends/plain-text.ts`](../../skills/statechart/scripts/backends/plain-text.ts) |
| Statechart | [`statechart/scripts/backends/report.ts`](../../skills/statechart/scripts/backends/report.ts) |
| Statechart | [`statechart/scripts/frontends/config.ts`](../../skills/statechart/scripts/frontends/config.ts) |
| Statechart | [`statechart/scripts/frontends/dot.ts`](../../skills/statechart/scripts/frontends/dot.ts) |
| Statechart | [`statechart/scripts/frontends/marks.ts`](../../skills/statechart/scripts/frontends/marks.ts) |
| Statechart | [`statechart/scripts/frontends/messages.ts`](../../skills/statechart/scripts/frontends/messages.ts) |
| Statechart | [`statechart/scripts/frontends/spec.ts`](../../skills/statechart/scripts/frontends/spec.ts) |
| Statechart | [`statechart/scripts/frontends/trace.ts`](../../skills/statechart/scripts/frontends/trace.ts) |
| Statechart | [`statechart/scripts/frontends/value.ts`](../../skills/statechart/scripts/frontends/value.ts) |
| Statechart | [`statechart/scripts/frontends/verdict.ts`](../../skills/statechart/scripts/frontends/verdict.ts) |
| Statechart | [`statechart/scripts/frontends/view.ts`](../../skills/statechart/scripts/frontends/view.ts) |
| Statechart | [`statechart/scripts/ir.ts`](../../skills/statechart/scripts/ir.ts) |
| Statechart | [`statechart/scripts/package.json`](../../skills/statechart/scripts/package.json) |
| Statechart | [`statechart/scripts/passes/annotate.ts`](../../skills/statechart/scripts/passes/annotate.ts) |
| Statechart | [`statechart/scripts/passes/label.ts`](../../skills/statechart/scripts/passes/label.ts) |
| Statechart | [`statechart/scripts/passes/lift.ts`](../../skills/statechart/scripts/passes/lift.ts) |
| Statechart | [`statechart/scripts/passes/loop-check.ts`](../../skills/statechart/scripts/passes/loop-check.ts) |
| Statechart | [`statechart/scripts/passes/paths.ts`](../../skills/statechart/scripts/passes/paths.ts) |
| Statechart | [`statechart/scripts/passes/reach.ts`](../../skills/statechart/scripts/passes/reach.ts) |
| Statechart | [`statechart/scripts/passes/region-check.ts`](../../skills/statechart/scripts/passes/region-check.ts) |
| Statechart | [`statechart/scripts/passes/regions.ts`](../../skills/statechart/scripts/passes/regions.ts) |
| Statechart | [`statechart/scripts/pipeline.ts`](../../skills/statechart/scripts/pipeline.ts) |
| Statechart | [`statechart/scripts/run.ts`](../../skills/statechart/scripts/run.ts) |
| Statechart | [`statechart/scripts/statechart`](../../skills/statechart/scripts/statechart) |
| Statechart | [`statechart/scripts/statechart.ts`](../../skills/statechart/scripts/statechart.ts) |
| Statechart | [`statechart/scripts/test/ConfigOracle.java`](../../skills/statechart/scripts/test/ConfigOracle.java) |
| Statechart | [`statechart/scripts/test/chart.test.ts`](../../skills/statechart/scripts/test/chart.test.ts) |
| Statechart | [`statechart/scripts/test/cli.test.ts`](../../skills/statechart/scripts/test/cli.test.ts) |
| Statechart | [`statechart/scripts/test/config-fuzz.test.ts`](../../skills/statechart/scripts/test/config-fuzz.test.ts) |
| Statechart | [`statechart/scripts/test/corpus.test.ts`](../../skills/statechart/scripts/test/corpus.test.ts) |
| Statechart | [`statechart/scripts/test/differential.test.ts`](../../skills/statechart/scripts/test/differential.test.ts) |
| Statechart | [`statechart/scripts/test/drawn.ts`](../../skills/statechart/scripts/test/drawn.ts) |
| Statechart | [`statechart/scripts/test/java.ts`](../../skills/statechart/scripts/test/java.ts) |
| Statechart | [`statechart/scripts/test/labels.ts`](../../skills/statechart/scripts/test/labels.ts) |
| Statechart | [`statechart/scripts/test/messages.test.ts`](../../skills/statechart/scripts/test/messages.test.ts) |
| Statechart | [`statechart/scripts/test/pipeline.test.ts`](../../skills/statechart/scripts/test/pipeline.test.ts) |
| Statechart | [`statechart/scripts/test/plain-tlc.test.ts`](../../skills/statechart/scripts/test/plain-tlc.test.ts) |
| Statechart | [`statechart/scripts/test/render.test.ts`](../../skills/statechart/scripts/test/render.test.ts) |
| Statechart | [`statechart/scripts/test/tlc-out.test.ts`](../../skills/statechart/scripts/test/tlc-out.test.ts) |
| Statechart | [`statechart/scripts/test/tlc.ts`](../../skills/statechart/scripts/test/tlc.ts) |
| Statechart | [`statechart/scripts/tsconfig.json`](../../skills/statechart/scripts/tsconfig.json) |
| Statechart | [`statechart/scripts/worker.ts`](../../skills/statechart/scripts/worker.ts) |
| Packaging and docs | [`scripts/check-pstack-docs.mjs`](../../../scripts/check-pstack-docs.mjs) |
| Packaging and docs | [`scripts/generate-pstack-harness-trees.mjs`](../../../scripts/generate-pstack-harness-trees.mjs) |

Also review the linked references and templates when reviewing their owning
skill, the [README](../../README.md) and [guide](../guide/README.md) with the
behavior they document, and the [Benny automation pack](../../automations/benny/README.md)
with its skills.

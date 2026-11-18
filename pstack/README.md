# pstack

Lauren Tan's pstack workflows, adapted for local use in Codex and Claude Code. The plugin chooses a playbook, applies relevant engineering principles, and asks for evidence that the result works.

See the [local setup guide](./docs/guide/01-setup.md) to load the plugin. Start with [Poteto mode](./skills/poteto-mode/SKILL.md) and give it a concrete task and a finish check.

```text
Use poteto-mode to fix the CSV export. Reproduce the missing row, then run the same fixture after the fix.
```

Agents, project tools, and worktrees run on your machine. Model inference uses your signed-in Codex or Claude service. [Setup pstack](./skills/setup-pstack/SKILL.md) manages optional workspace overrides. Arena defaults to one Codex and one Claude attempt, with an opposite-provider judge when available. A standard run hands back a verified local patch.

## Skills

| Skill | Use it for |
|---|---|
| [`/architect`](./skills/architect/SKILL.md) | you're about to write code that crosses a function boundary and want the caller's usage, types, and module shape settled first. |
| [`/arena`](./skills/arena/SKILL.md) | Compare independent local Codex and Claude attempts. |
| [`/automate-me`](./skills/automate-me/SKILL.md) | Turn supplied preferences into a local mode skill. |
| [`/benchmark-checklist`](./skills/benchmark-checklist/SKILL.md) | you ran a benchmark or measured a speedup or regression. vets the number (limiter, tuning, errors, repeat runs, end-to-end relevance) before you report or act on it. |
| [`/blast-radius`](./skills/blast-radius/SKILL.md) | you have a small-looking change and want to know what else it could break, with the one fact it's safe because of proven by running code, not asserted. |
| [`/bro`](./skills/bro/SKILL.md) | you want the last message restated in plain human language, no jargon. |
| [`/correct`](./skills/correct/SKILL.md) | you keep correcting agents for the same mistakes. mines history for mistake classes, fixes each at the highest level that works (architecture, then types, lint, and ci, then tests, with docs last), and keeps a table pairing each rule with what enforces it. |
| [`/create-formal-verification-skill`](./skills/create-formal-verification-skill/SKILL.md) | tests can't reach the case that breaks a race, retry, state machine, parser, or unsafe code. verifies one property with the tool that fits and generates a project-local skill to recheck it on every change. |
| [`/create-verification-skill`](./skills/create-verification-skill/SKILL.md) | your project has no scripted way to prove app behavior. generates a project-local verify skill with a feature map, for any language or platform. |
| [`/figure-it-out`](./skills/figure-it-out/SKILL.md) | no bundled playbook fits. designs a rigorous, auditable playbook for the task. |
| [`/how`](./skills/how/SKILL.md) | you want a walkthrough of how a subsystem works. |
| [`/in-your-own-words`](./skills/in-your-own-words/SKILL.md) | you want the agent to play back your goal and the problem before it starts. runs only when you type `/in-your-own-words`. |
| [`/interrogate`](./skills/interrogate/SKILL.md) | Review a change locally with findings backed by reproducible evidence. |
| [`/ketchup`](./skills/ketchup/SKILL.md) | you want what changed in this chat since your last message, in plain words and small visuals, with every item waiting on you listed and decidable from the reply alone, even when that makes the reply long. |
| [`/ketchup-video`](./skills/ketchup-video/SKILL.md) | you want the `/ketchup` catch-up as a short subtitled video of slides, with the calls waiting on you as text under it. |
| [`/maintain-formal-verification-skill`](./skills/maintain-formal-verification-skill/SKILL.md) | code your formal verification covers has changed since it was last checked. updates the model, harness, or properties to match the code, reruns, and says whether each failure is drift in the verification or a bug in the code. |
| [`/maintain-verification-skill`](./skills/maintain-verification-skill/SKILL.md) | your verify skill's feature map has drifted from the app. source wave + one live pass, at most one PR of proven corrections. |
| [`/no-comments`](./skills/no-comments/SKILL.md) | strip comments before review; spawns Comment Sicko, fixes accepted findings, offers encodings for claimed constraints. |
| [`/poteto-help`](./skills/poteto-help/SKILL.md) | Find a workflow and a prompt to use it. |
| [`/poteto-mode`](./skills/poteto-mode/SKILL.md) | Choose and run a playbook, and verify the result. |
| [`/recall`](./skills/recall/SKILL.md) | Rebuild context from local records and supplied transcripts. |
| [`/reflect`](./skills/reflect/SKILL.md) | a long task landed and you want the recipe captured as a skill edit. |
| [`/setup-pstack`](./skills/setup-pstack/SKILL.md) | Configure local Codex and Claude runners. |
| [`/sharpen`](./skills/sharpen/SKILL.md) | you want a prompt made deeper, not bigger, before you send it: what a top professional would do that you didn't ask for, the raw material they'd start from, their methods and tools, and an outside check that the result is right. hands back the rewritten prompt, which asks the agent to prototype any choice an experiment can settle and leaves product and preference choices to you. doesn't do the task. runs only when you type `/sharpen`. |
| [`/show-me-your-work`](./skills/show-me-your-work/SKILL.md) | you want a reviewable decision trail. logs decisions to a tsv you can commit. |
| [`/statechart`](./skills/statechart/SKILL.md) | someone who owns the behavior needs to see it, not read a spec. checks a tla+ model, draws what the user sees as a mermaid statechart, marks each state that breaks a rule, and gives the shortest path to each one. |
| [`/swarm`](./skills/swarm/SKILL.md) | you want N parallel workers across different slices or races, then one aggregated report. |
| [`/tdd`](./skills/tdd/SKILL.md) | you're fixing a bug and there's a cheap local test path. write the failing test first, then the fix. |
| [`/teach`](./skills/teach/SKILL.md) | you want to actually understand a change or subsystem, not just have it summarized. runs how + why and weaves one plain explanation, built up diagram by diagram. |
| [`/technical-writing`](./skills/technical-writing/SKILL.md) | layered doc standard (Diátaxis + Google developer style + STE + Global English) for docs, RFCs, readmes, PR descriptions, commit messages. |
| [`/typescript-best-practices`](./skills/typescript-best-practices/SKILL.md) | you're reading or editing typescript. grounds the type-system-discipline principle in syntax. |
| [`/unslop`](./skills/unslop/SKILL.md) | you're cleaning up writing. removes AI tells. |
| [`/why`](./skills/why/SKILL.md) | you want to know why something was built this way. answers from the record, not the code: the commits and pr discussions that introduced it and each later change, and other sources when that trail is thin. cites what the authors wrote, marks its own inferences, and says what the record does not answer. |

## Engineering principles

- [Attack the premise](./skills/principle-attack-the-premise/SKILL.md)
- [Boundary discipline](./skills/principle-boundary-discipline/SKILL.md)
- [Build the lever](./skills/principle-build-the-lever/SKILL.md)
- [Encode lessons in structure](./skills/principle-encode-lessons-in-structure/SKILL.md)
- [Exhaust the design space](./skills/principle-exhaust-the-design-space/SKILL.md)
- [Experience first](./skills/principle-experience-first/SKILL.md)
- [Explain the number](./skills/principle-explain-the-number/SKILL.md)
- [Fix root causes](./skills/principle-fix-root-causes/SKILL.md)
- [Foundational thinking](./skills/principle-foundational-thinking/SKILL.md)
- [Guard the context window](./skills/principle-guard-the-context-window/SKILL.md)
- [Laziness protocol](./skills/principle-laziness-protocol/SKILL.md)
- [Make operations idempotent](./skills/principle-make-operations-idempotent/SKILL.md)
- [Migrate callers then delete legacy apis](./skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md)
- [Minimize reader load](./skills/principle-minimize-reader-load/SKILL.md)
- [Model the domain](./skills/principle-model-the-domain/SKILL.md)
- [Never block on the human](./skills/principle-never-block-on-the-human/SKILL.md)
- [Outcome oriented execution](./skills/principle-outcome-oriented-execution/SKILL.md)
- [Prove it works](./skills/principle-prove-it-works/SKILL.md)
- [Redesign from first principles](./skills/principle-redesign-from-first-principles/SKILL.md)
- [Separate before serializing shared state](./skills/principle-separate-before-serializing-shared-state/SKILL.md)
- [Sequence verifiable units](./skills/principle-sequence-verifiable-units/SKILL.md)
- [Subtract before you add](./skills/principle-subtract-before-you-add/SKILL.md)
- [Test behavior not implementation](./skills/principle-test-behavior-not-implementation/SKILL.md)
- [Type system discipline](./skills/principle-type-system-discipline/SKILL.md)

## Playbooks

- [Author or edit a skill](./skills/poteto-mode/playbooks/authoring-a-skill.md)
- [Autonomous run](./skills/poteto-mode/playbooks/autonomous-run.md)
- [Bug fix](./skills/poteto-mode/playbooks/bug-fix.md)
- [Eval](./skills/poteto-mode/playbooks/eval.md)
- [Feature](./skills/poteto-mode/playbooks/feature.md)
- [Hillclimb](./skills/poteto-mode/playbooks/hillclimb.md)
- [Investigation](./skills/poteto-mode/playbooks/investigation.md)
- [Multi-phase or multi-PR plan](./skills/poteto-mode/playbooks/multi-phase-plan.md)
- [Pause safely](./skills/poteto-mode/playbooks/pause-safely.md)
- [Perf issue](./skills/poteto-mode/playbooks/perf-issue.md)
- [Prepare a local review](./skills/poteto-mode/playbooks/prepare-review.md)
- [Prototype](./skills/poteto-mode/playbooks/prototype.md)
- [Refactoring](./skills/poteto-mode/playbooks/refactoring.md)
- [Runtime forensics](./skills/poteto-mode/playbooks/runtime-forensics.md)
- [Session pickup](./skills/poteto-mode/playbooks/session-pickup.md)
- [Trace forensics](./skills/poteto-mode/playbooks/trace-forensics.md)
- [Visual parity](./skills/poteto-mode/playbooks/visual-parity.md)
- [Worktree cleanup](./skills/poteto-mode/playbooks/worktree-cleanup.md)

## Agent briefs

- [`comment-sicko`](./agents/comment-sicko.md)
- [`poteto-agent`](./agents/poteto-agent.md)

Browse the [full guide](./docs/guide/README.md) for examples.

Original pstack by Lauren Tan. See [the MIT license](./LICENSE) and [upstream source](https://github.com/cursor/plugins/tree/main/pstack).

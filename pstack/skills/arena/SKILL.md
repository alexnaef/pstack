---
name: arena
description: "Spawn N parallel candidates at the same task, pick a base, graft the strongest parts of the losers into it. Use for /arena, 'arena this', 'throw it in the arena', or when one attempt at a non-trivial artifact would lock in the wrong shape."
disable-model-invocation: true
---

# Arena

Track one entry per phase (Frame, Fan out, Cross-judge, Pick, Graft, Verify) with the host's planning tool when available. Follow [local runners](../poteto-mode/references/local-runners.md).

## Phase A: Frame

Every candidate gets the same prompt, so the prompt is the contract.

1. State the artifact each candidate is producing.
2. Derive the rubric, 3-6 concrete gradeable criteria for what success looks like on *this* task. It is the picker's tool in Phase D. Candidates only see the task.
3. Use `arenaRunners` from the project's `.pstack/models.json`, defaulting to one Codex and one Claude attempt. Run the eligible entries. If only one provider is available, use separate attempts on that provider and say so. If fewer than two independent candidates finish, report the limitation and verify the available result without claiming a comparison.
4. Give each candidate its own output location (a git worktree where possible, otherwise `/tmp/arena-<slug>/candidate-<n>/`), per the **separate-before-serializing-shared-state** principle skill.

## Phase B: Fan out

Start the candidates locally in parallel when the host permits it. Give each the same task, shared grounding, a separate output path, and a request for a short rationale. If delegation is unavailable, compare options in this session and say they came from one agent.

If a candidate produces no output, proceed with N-1 and note the dropout.

## Phase C: Cross-judge

After the candidates finish, use `arenaJudges` (default Codex and Claude) to select the first available read-only judge from the other provider than the coordinator. The judge scores each candidate against the same rubric and recommends a base. If the coordinator's provider is unknown or the other provider cannot run, record that there was no cross-judge and proceed with the coordinator's own scores.

## Phase D: Pick a base

Read every candidate end to end before picking. Score each against the rubric criterion by criterion, not on holistic feel, and compare with the cross-judge when Phase C ran one. Agreement on the base confirms the pick. Disagreement means one of you is biased or the rubric was ambiguous. Read both rationales before deciding.

Pick the base a future maintainer can extend most easily without breaking invariants. When two feel tied, prefer the cleaner boundary or smaller API, per the Laziness Protocol.

## Phase E: Graft

Walk each losing candidate once more for what is worth porting into the base, usually one or two things per candidate, not most of it. Fold each graft in by hand, per the **redesign-from-first-principles** principle skill, so the result stays coherent under one mental model. Don't paste mechanically.

If the candidates converge on one shape, that is strong agreement. Note it and ship the consensus shape. No graft is needed. If they wildly diverge, Phase A was under-specified. Reframe and re-run rather than averaging the divergence.

## Phase F: Verify

Verify the synthesized artifact like any other output, per the **prove-it-works** principle skill. If verification finds a problem the arena missed, either Phase A was wrong (re-frame and re-run) or a candidate caught it and you missed the graft (go back to Phase E). Don't paper over it.

## Outputs

One synthesized artifact, with a short synthesis note alongside naming the base and why, the cross-judge's verdict or that Phase C skipped the judge, each graft with its source candidate, what was rejected and why, any convergence or dropouts, and the verification result.

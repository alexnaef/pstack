#!/usr/bin/env bash
# Report local worktree status. Never fetch, read chat history, or delete files.
set -euo pipefail

base=
while [ "$#" -gt 0 ]; do
  case "$1" in
    -b|--base)
      [ "$#" -ge 2 ] || { echo "Missing base ref" >&2; exit 2; }
      base=$2
      shift 2 ;;
    -h|--help)
      echo "Usage: worktree-audit.sh [-b <local-base-ref>] [repo-path]"
      exit ;;
    --) shift; break ;;
    -*) printf 'Unknown option: %s\n' "$1" >&2; exit 2 ;;
    *) break ;;
  esac
done
repo=${1:-.}
git -C "$repo" rev-parse --git-dir >/dev/null
base=${base:-$(git -C "$repo" symbolic-ref --quiet --short refs/remotes/origin/HEAD || true)}
if [ -z "$base" ]; then
  for ref in refs/heads/main refs/heads/master HEAD; do
    if git -C "$repo" rev-parse --verify -q "$ref^{commit}" >/dev/null; then
      base=$ref
      break
    fi
  done
fi
base_commit=$(git -C "$repo" rev-parse --verify --end-of-options "$base^{commit}")
printf '# base: %s (%s)\n' "$base" "$base_commit"
printf 'SIZE\tSTATUS\tBRANCH\tWORKTREE\n'

main=true
while IFS= read -r -d '' entry; do
  case "$entry" in
    "worktree "*)
      worktree=${entry#worktree }
      head= branch= marker= ;;
    "HEAD "*) head=${entry#HEAD } ;;
    "branch "*) branch=${entry#branch refs/heads/} ;;
    locked*) marker=locked ;;
    prunable*) marker=prunable ;;
    "")
      if "$main"; then
        main=false
        continue
      fi
      status=review
      if [ -n "$marker" ]; then
        status=$marker
      elif ! changes=$(git -C "$worktree" status --porcelain --untracked-files=all --ignored=matching 2>/dev/null); then
        status=unavailable
      elif [ -n "$changes" ]; then
        status=has-files
      elif [ -n "$head" ] && git -C "$repo" merge-base --is-ancestor "$head" "$base_commit"; then
        status=merged-clean
      fi
      size=$(du -sh "$worktree" 2>/dev/null | awk '{print $1}' || true)
      printf '%s\t%s\t%s\t%s\n' "${size:--}" "$status" "${branch:-detached}" "$worktree"
      ;;
  esac
done < <(git -C "$repo" worktree list --porcelain -z)

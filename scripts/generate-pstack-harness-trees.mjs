#!/usr/bin/env node

import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "pstack");
const out = join(root, "harness", "pstack");
const host = "claude-code";

function walk(dir) {
  return readdirSync(dir).sort().flatMap((name) => {
    if (name === ".DS_Store" || name === "node_modules") return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function file(path) {
  return { bytes: readFileSync(path), executable: (statSync(path).mode & 0o111) !== 0 };
}

const targets = [
  ...walk(join(source, "skills")),
  ...walk(join(source, "agents")),
  ...walk(join(source, "docs", "guide")),
  ...walk(join(source, "docs", "harness")),
  ...["README.md", "LICENSE", "plugin.json"].map((path) => join(source, path)),
];
const files = new Map(targets.map((path) => [join(host, relative(source, path)), file(path)]));
const manifest = JSON.parse(readFileSync(join(source, "plugin.json"), "utf8"));
delete manifest.$schema;
files.set(join(host, ".claude-plugin", "plugin.json"), {
  bytes: Buffer.from(JSON.stringify(manifest, null, 2) + "\n"),
  executable: false,
});
files.set("README.md", {
  bytes: Buffer.from("# Local pstack packages\n\nCodex loads the source package. Claude Code loads `claude-code/`, generated from the same skills.\n\nRefresh it with `node scripts/generate-pstack-harness-trees.mjs` at the repository root.\n"),
  executable: false,
});

if (process.argv.includes("--check")) {
  const actual = new Map((existsSync(out) ? walk(out) : []).map((path) => [relative(out, path), file(path)]));
  const drift = [...new Set([...files.keys(), ...actual.keys()])].sort().filter((path) => {
    const want = files.get(path);
    const have = actual.get(path);
    return !want || !have || !want.bytes.equals(have.bytes) || want.executable !== have.executable;
  });
  if (drift.length) {
    for (const path of drift.slice(0, 20)) console.error(join("harness", "pstack", path));
    console.error("Regenerate the local Claude Code package.");
    process.exitCode = 1;
  } else {
    console.log("Local Claude Code package is up to date.");
  }
} else {
  rmSync(out, { recursive: true, force: true });
  for (const [path, { bytes, executable }] of files) {
    const target = join(out, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, bytes);
    chmodSync(target, executable ? 0o755 : 0o644);
  }
}

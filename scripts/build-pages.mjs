import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

process.env.GITHUB_PAGES = "true";

const binary = process.platform === "win32" ? "next.cmd" : "next";
const nextPath = path.join("node_modules", ".bin", binary);
const command = existsSync(nextPath) ? nextPath : binary;
const result = spawnSync(command, ["build"], {
  env: process.env,
  stdio: "inherit",
  shell: process.platform === "win32"
});

process.exit(result.status ?? 1);


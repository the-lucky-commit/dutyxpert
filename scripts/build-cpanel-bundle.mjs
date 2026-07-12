import { mkdirSync, rmSync, statSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const output = resolve(root, "deploy/dutyxpert-cpanel.tar.gz")

const requiredPaths = [
  ".next",
  "public",
  "src",
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "server.js",
  "tsconfig.json",
  "postcss.config.mjs",
  "eslint.config.mjs",
  ".cpanel.yml",
  ".gitignore",
  "README.md",
]

for (const relativePath of requiredPaths) {
  statSync(resolve(root, relativePath))
}

mkdirSync(dirname(output), { recursive: true })
rmSync(output, { force: true })

const result = spawnSync(
  "tar",
  [
    "--no-xattrs",
    "--no-acls",
    "-czf",
    output,
    "--exclude=.next/cache",
    "--exclude=.next/dev",
    ...requiredPaths,
  ],
  {
    cwd: root,
    env: {
      ...process.env,
      COPYFILE_DISABLE: "1",
      COPY_EXTENDED_ATTRIBUTES_DISABLE: "1",
    },
    stdio: "inherit",
  }
)

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

const { size } = statSync(output)
console.log(`Created ${output} (${(size / 1024 / 1024).toFixed(2)} MB)`)

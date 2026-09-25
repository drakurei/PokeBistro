import { existsSync, readdirSync, rmdirSync, rmSync, statSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

// Removes a folder and everything in it. fs.rmSync should be enough, but on some Windows setups
// (sandboxed shells, files held by a preview server) it returns without deleting: the walk below
// finishes the job file by file and reports what could not be removed.
export function removeDir(path) {
  if (!existsSync(path)) return []
  try {
    rmSync(path, { recursive: true, force: true })
  } catch {
    // handled by the walk
  }
  const stubborn = []
  const walk = (dir) => {
    if (!existsSync(dir)) return
    for (const name of readdirSync(dir)) {
      const entry = join(dir, name)
      try {
        if (statSync(entry).isDirectory()) {
          walk(entry)
          rmdirSync(entry)
        } else {
          unlinkSync(entry)
        }
      } catch {
        stubborn.push(entry)
      }
    }
  }
  walk(path)
  try {
    if (existsSync(path)) rmdirSync(path)
  } catch {
    stubborn.push(path)
  }
  return stubborn
}

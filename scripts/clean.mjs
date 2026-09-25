// Empties the build folders before a build, so dist never carries chunks of a previous version.
import { removeDir } from './lib/remove.mjs'

for (const folder of ['dist', 'dist-ssr']) {
  const stubborn = removeDir(folder)
  if (stubborn.length > 0) {
    console.error(
      `${folder}: ${stubborn.length} entries could not be removed (is a preview server still running?)`,
    )
    process.exit(1)
  }
}

import { lazy } from 'react'
import LazyFailed from '../components/layout/LazyFailed'

// lazy() with two extras:
// - a fallback: when a chunk cannot be fetched (offline, a deploy replaced the files), the route
//   shows a small "reload" panel instead of throwing to the error boundary;
// - a preload(): the pre-render script loads every page first, so nothing suspends while the
//   static HTML is produced (no Suspense placeholders, no inline runtime script in the output).
export default function lazyPage(loader) {
  let Loaded = null
  const Lazy = lazy(() =>
    loader()
      .then((module) => {
        Loaded = module.default
        return module
      })
      .catch(() => ({ default: LazyFailed })),
  )
  function Page(props) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />
  }
  Page.preload = () =>
    loader().then((module) => {
      Loaded = module.default
    })
  return Page
}

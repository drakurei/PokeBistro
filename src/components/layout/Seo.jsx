import { getPageMeta, headTags, SITE_URL } from '../../seo/pageMeta'

// Page metadata, derived from the current URL and rendered once at the root of the app. React 19 hoists <title>, <meta> and <link> rendered
// anywhere into <head>; when the page was pre-rendered, the same tags are already there and React
// adopts them instead of adding duplicates. The JSON-LD of a page is written into <head> by the
// pre-render script (scripts/prerender.mjs) from the same metadata: static, never re-rendered.
export default function Seo({ path = '/' }) {
  const meta = getPageMeta(path)

  return (
    <>
      {headTags(meta).map(([tag, attrs, text]) => {
        const key = attrs.name ?? attrs.property ?? attrs.rel ?? tag
        if (tag === 'title') return <title key="title">{text}</title>
        if (tag === 'link') return <link key={key} {...attrs} />
        return <meta key={key} {...attrs} />
      })}
    </>
  )
}

export { SITE_URL }

// First focusable element of the page: lets keyboard users jump over the header
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-bold text-porcelain focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Aller au contenu
    </a>
  )
}

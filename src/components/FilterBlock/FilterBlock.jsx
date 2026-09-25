// One block of the sidebar: a small title and the filter inside.
// Blocks are separated by a thin line (see .filter-block in globals.css).
function FilterBlock({ title, children }) {
  return (
    <section className="filter-block">
      <h3 className="mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">{title}</h3>
      {children}
    </section>
  )
}

export default FilterBlock

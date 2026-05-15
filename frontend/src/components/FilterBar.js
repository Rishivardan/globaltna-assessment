export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div id="jobs" className="flex flex-col gap-4">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Filter
      </div>
      <label className="flex w-full max-w-xs flex-col gap-2 text-sm font-semibold text-slate-300">
        Category
        <select
          value={activeCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

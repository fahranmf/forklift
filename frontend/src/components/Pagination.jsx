import React from "react";

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 15],
}) {
  const total = totalItems || 0;
  const totalPages = Math.max(1, Math.ceil(total / (pageSize || 1)));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const [gotoVal, setGotoVal] = React.useState(String(page));
  React.useEffect(() => setGotoVal(String(page)), [page]);

  const clamp = (v) => Math.max(1, Math.min(totalPages, v || 1));

  const baseBtn =
    "group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 " +
    "hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none " +
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600 transition";

  const iconCls = "h-4 w-4";

  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
                 rounded-xl border border-gray-200 dark:border-gray-700
                 bg-white/60 dark:bg-gray-900 backdrop-blur supports-[backdrop-filter]:backdrop-blur
                 px-3 py-3 shadow-sm"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Left: Rows per page + range */}
      <div className="flex flex-wrap items-center gap-2">
        <label
          htmlFor="rows-per-page"
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          Rows per page
        </label>

        {/* Wrapper */}
        <div className="relative inline-block z-20">
          <select
            id="rows-per-page"
            className="h-9 min-w-[4.5rem] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md
                 pl-2 pr-8 text-sm appearance-none
                 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          
        </div>

        <span className="text-sm text-gray-600 dark:text-gray-300">
          {start}-{end} of {totalItems}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* First */}
        <button
          className={baseBtn}
          onClick={() => onPageChange?.(1)}
          disabled={!canPrev}
          aria-label="First page"
          title="First page"
        >
          <svg
            className={iconCls}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11.78 15.53a.75.75 0 0 1-1.06 0L4.72 9.53a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L6.81 9l5 5a.75.75 0 0 1-.03 1.06z" />
            <rect x="14" y="2.5" width="1.5" height="15" rx=".75" />
          </svg>
          <span className="sr-only">First</span>
        </button>

        {/* Prev */}
        <button
          className={baseBtn}
          onClick={() => onPageChange?.(page - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
          title="Previous page"
        >
          <svg
            className={iconCls}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.78 15.53a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 9l4.47 4.47a.75.75 0 0 1 0 1.06z" />
          </svg>
          Prev
        </button>

        {/* Page indicator (hide on small) */}
        <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-200 select-none">
          Page
        </span>

        {/* Go to page */}
        <div className="inline-flex items-center gap-1">
          <label htmlFor="goto" className="sr-only">
            Go to page
          </label>
          <input
            id="goto"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 text-sm
                       focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600"
            value={gotoVal}
            onChange={(e) => setGotoVal(e.target.value.replace(/[^\d]/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const next = clamp(Number(gotoVal));
                onPageChange?.(next);
              }
            }}
            onBlur={() => {
              const next = clamp(Number(gotoVal));
              if (next !== page) onPageChange?.(next);
              setGotoVal(String(next));
            }}
            aria-label="Go to page"
            placeholder="Page"
            title="Go to page"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            / {totalPages}
          </span>
        </div>

        {/* Next */}
        <button
          className={baseBtn}
          onClick={() => onPageChange?.(page + 1)}
          disabled={!canNext}
          aria-label="Next page"
          title="Next page"
        >
          Next
          <svg
            className={iconCls}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.22 4.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L11.69 11 7.22 6.53a.75.75 0 0 1 0-1.06z" />
          </svg>
        </button>

        {/* Last */}
        <button
          className={baseBtn}
          onClick={() => onPageChange?.(totalPages)}
          disabled={!canNext}
          aria-label="Last page"
          title="Last page"
        >
          <span className="sr-only">Last</span>
          <svg
            className={iconCls}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="4.5" y="2.5" width="1.5" height="15" rx=".75" />
            <path d="M7.22 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L12.19 11 7.22 6.03a.75.75 0 0 1 0-1.56z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

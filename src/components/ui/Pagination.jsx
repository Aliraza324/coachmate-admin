import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  page,
  totalPages,
  onChange,
  rangeStart,
  rangeEnd,
  total,
}) {
  const pageNumbers = buildPageList(page, totalPages)

  return (
    <div className="flex flex-col items-start justify-between gap-3 px-1 pt-2 sm:flex-row sm:items-center sm:px-0">
      {total !== undefined && (
        <p className="text-xs text-ink-muted">
          Showing {rangeStart} to {rangeEnd} of {total.toLocaleString()} entries
        </p>
      )}
      <div className="flex flex-wrap items-center justify-end gap-1">
        <PageBtn
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          label="Previous page"
        >
          <ChevronLeft size={16} />
        </PageBtn>
        {pageNumbers.map((item, i) =>
          item === '…' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-ink-muted">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              className={`grid h-8 w-8 place-items-center rounded-md text-sm font-medium transition ${
                item === page
                  ? 'bg-cyan-brand text-white shadow-[0_2px_8px_rgba(34,169,240,0.35)]'
                  : 'border border-border bg-white text-ink hover:bg-slate-50'
              }`}
            >
              {item}
            </button>
          ),
        )}
        <PageBtn
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          label="Next page"
        >
          <ChevronRight size={16} />
        </PageBtn>
      </div>
    </div>
  )
}

function PageBtn({ children, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-md border border-border bg-white text-ink-muted transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function buildPageList(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const pages = [1]
  if (page > 3) pages.push('…')
  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (page < totalPages - 2) pages.push('…')
  pages.push(totalPages)
  return pages
}

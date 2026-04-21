export function Th({ children, align = 'left' }) {
  return (
    <th
      className={`border-b border-border bg-slate-50 px-4 py-3 text-xs font-medium text-ink-muted first:rounded-tl-xl last:rounded-tr-xl text-${align}`}
    >
      {children}
    </th>
  )
}

export function Td({ children, last = false, className = '' }) {
  return (
    <td className={`border-b border-border px-4 py-4 ${last ? 'border-b-0' : ''} ${className}`}>
      {children}
    </td>
  )
}

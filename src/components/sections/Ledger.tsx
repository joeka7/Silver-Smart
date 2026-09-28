export interface LedgerStat {
  /** Small uppercase key above the value. */
  label: string
  value: string
  /** Sentence under the value. */
  note: string
  /** Renders the value at headline-sm rather than headline-lg (for longer strings). */
  small?: boolean
}

/** Four-up metric ledger. */
export function Ledger({ stats }: { stats: LedgerStat[] }) {
  return (
    <div className="ledger" data-stagger=".06">
      {stats.map((s) => (
        <div className="ledger-cell" data-r key={s.label}>
          <div className="ledger-top">
            <span className="t-label c-muted">{s.label}</span>
            <span className="dot" aria-hidden="true"></span>
          </div>
          <div>
            <div className="ledger-v" style={s.small ? { fontSize: 'var(--headline-sm)' } : undefined}>
              {s.value}
            </div>
            <p className="ledger-k">{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

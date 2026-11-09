import { useState, type CSSProperties } from 'react'
import { asset, type Content } from '../content'

interface GoldenRecordProps {
  record: Content['record']
  projectHref: string
}

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

// The hero's one orchestrated moment: three raw source rows, four quality rules
// that pass one after the other, then the golden record. The final state is the
// base style; the keyframes only describe where each element starts from, so
// with reduced motion (animations off) the merged result shows at once.
export function GoldenRecord({ record, projectHref }: GoldenRecordProps) {
  const [run, setRun] = useState(0)

  return (
    <figure className="record" aria-labelledby="record-caption">
      <div key={run} className="record-stage">
        <table className="record-sources">
          <thead>
            <tr>
              <th scope="col">{record.sourceHeader}</th>
              {record.fields.map((field, i) => (
                <th scope="col" key={field} className={i === 2 ? 'record-col-city' : undefined}>
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {record.sources.map((source, row) => (
              <tr key={source.label} style={stagger(row)}>
                <th scope="row">{source.label}</th>
                {source.cells.map((cell, col) => (
                  <td
                    key={record.fields[col]}
                    className={col === 2 ? 'record-col-city' : undefined}
                    data-defect={cell.defect || cell.value === null ? '' : undefined}
                  >
                    {cell.value ?? <span className="record-empty">{record.empty}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="record-rules">
          {record.rules.map((rule, i) => (
            <li key={rule.name} style={stagger(i)}>
              <svg className="record-check" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
              </svg>
              <span className="record-rule-name">{rule.name}</span>
              <span className="record-rule-note">{rule.note}</span>
            </li>
          ))}
        </ul>

        <div className="record-golden">
          <img src={asset('omar.jpg')} width="64" height="64" alt="" className="record-photo" />
          <div>
            <p className="record-golden-label">{record.goldenLabel}</p>
            <p className="record-golden-name">{record.golden.name}</p>
            <p className="record-golden-meta">
              {record.golden.role}, {record.golden.city}
            </p>
            <p className="record-golden-status">
              <span className="record-dot" aria-hidden="true" />
              {record.golden.status}
            </p>
          </div>
        </div>
      </div>

      <figcaption id="record-caption" className="record-caption">
        <span>{record.caption}</span>{' '}
        <span>
          {record.note} <a href={projectHref}>{record.noteLink}</a>
        </span>
      </figcaption>

      <button type="button" className="record-replay" onClick={() => setRun((n) => n + 1)}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M13 8a5 5 0 1 1-1.5-3.6M13 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {record.replay}
      </button>
    </figure>
  )
}

interface DataPathProps {
  label: string
  steps: string[]
}

// A project's data lineage, read left to right on wide screens and top to bottom
// on phones. The steps are a real sequence, so an ordered list is the right element.
export function DataPath({ label, steps }: DataPathProps) {
  return (
    <ol className="path" aria-label={label}>
      {steps.map((step) => (
        <li key={step} className="path-step">
          <span>{step}</span>
        </li>
      ))}
    </ol>
  )
}

const SliderRow = ({
  name,
  label,
  value,
  onChange,
  minLabel,
  maxLabel,
  neutralLabel,
  neutralValue,
  min,
  max,
  step
}) => {
  const handleChange = (event) => {
    const nextValue = Number(event.target.value)
    onChange(name, nextValue)
  }

  const range = max - min || 1
  const fallbackNeutral = neutralValue ?? min + range / 2
  const clampedNeutral = Math.min(Math.max(fallbackNeutral, min), max)
  const neutralPercent = ((clampedNeutral - min) / range) * 100
  const isNeutral = value === clampedNeutral
  const displayValue = neutralLabel && isNeutral ? `${value} (${neutralLabel})` : value
  const neutralId = neutralLabel ? `${name}-neutral` : undefined

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span
          className={`text-sm font-semibold min-w-[3.5rem] text-right ${
            isNeutral ? "text-brand" : "text-ink-secondary"
          }`}
        >
          {displayValue}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-16 text-xs text-ink-secondary">{minLabel}</span>
        <div className="relative flex-1">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-2 -translate-y-1/2 rounded-full bg-ink/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-10 h-2 w-8 -translate-y-1/2 -translate-x-1/2 transform rounded-full bg-brand/10"
            style={{ left: `${neutralPercent}%` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-10 h-5 w-px -translate-y-1/2 -translate-x-1/2 transform bg-brand/40"
            style={{ left: `${neutralPercent}%` }}
          />
          <input
            id={name}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            aria-describedby={neutralId}
            className="relative z-20 flex-1 h-2 w-full cursor-pointer rounded-lg bg-transparent accent-brand focus:outline-none focus-visible:outline-none"
          />
        </div>
        <span className="w-16 text-right text-xs text-ink-secondary">{maxLabel}</span>
      </div>
      {neutralLabel && (
        <div className="flex justify-center">
          <span id={neutralId} className="text-xs font-medium text-ink-secondary">
            {neutralLabel}
          </span>
        </div>
      )}
    </div>
  )
}

export default SliderRow

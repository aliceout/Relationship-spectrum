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
    <div className="group space-y-3 rounded-2xl border border-transparent px-3 py-3 shadow-[0_20px_50px_-40px_rgba(243,107,164,0.45)] transition duration-200 hover:border-brand/40 hover:bg-white/[0.8] hover:shadow-[0_28px_65px_-40px_rgba(243,107,164,0.6)] dark:hover:bg-white/[0.08] md:space-y-4 md:px-4 md:py-4">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={name} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span
          className={`min-w-[3.5rem] text-right text-sm font-semibold tracking-tight ${
            isNeutral ? "text-brand" : "text-ink-secondary"
          }`}
        >
          {displayValue}
        </span>
      </div>
      <div className="space-y-3 md:space-y-1">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand/15 via-accent/10 to-brand/15 dark:from-white/20 dark:via-white/10 dark:to-white/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-10 h-8 w-8 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/[0.6] blur-xl transition duration-300 dark:bg-white/[0.15]"
            style={{ left: `${neutralPercent}%` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-10 h-6 w-px -translate-y-1/2 -translate-x-1/2 bg-brand/50 dark:bg-white/[0.4]"
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
            className="relative z-20 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-brand focus-visible:outline-none"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-2 text-[11px] font-medium text-ink-secondary/85 md:text-xs">
          <span className="text-left">{minLabel}</span>
          {neutralLabel ? (
            <span id={neutralId} className="text-center text-brand">
              {neutralLabel}
            </span>
          ) : (
            <span />
          )}
          <span className="text-right">{maxLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default SliderRow

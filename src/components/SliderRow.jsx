const SliderRow = ({
  name,
  label,
  value,
  onChange,
  minLabel,
  maxLabel,
  min,
  max,
  step
}) => {
  const handleChange = (event) => {
    const nextValue = Number(event.target.value)
    onChange(name, nextValue)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={name} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span className="text-sm font-semibold text-ink-secondary min-w-[2rem] text-right">
          {value}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-16 text-xs text-ink-secondary">{minLabel}</span>
        <input
          id={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="flex-1 h-2 rounded-lg bg-ink/10 accent-brand focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <span className="w-16 text-xs text-right text-ink-secondary">{maxLabel}</span>
      </div>
    </div>
  )
}

export default SliderRow

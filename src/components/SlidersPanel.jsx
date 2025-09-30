import { forwardRef } from "react"
import PresetBadge from "./PresetBadge"
import SliderRow from "./SliderRow"
import { dimensionKeys, getDimensionLabel } from "../lib/i18n"

const SlidersPanel = forwardRef(({
  values,
  scale,
  labels,
  translations,
  lang,
  onSliderChange,
  presetLabel,
  isCustom
}, ref) => {
  return (
    <section ref={ref} className="bg-bg-card rounded-2xl shadow-sm border border-ink/5 p-6 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-ink">{translations.dimensionsTitle}</h2>
          <p className="text-sm text-ink-secondary">
            {translations.absence} to {translations.presence}
          </p>
        </div>
        {presetLabel && (
          <PresetBadge label={presetLabel} variant={isCustom ? "custom" : "default"} />
        )}
      </header>

      <div className="space-y-6">
        {dimensionKeys.map((key) => (
          <SliderRow
            key={key}
            name={key}
            label={getDimensionLabel(lang, key)}
            value={values[key] ?? scale.min}
            min={scale.min}
            max={scale.max}
            step={scale.step}
            minLabel={labels.min}
            maxLabel={labels.max}
            onChange={onSliderChange}
          />
        ))}
      </div>
    </section>
  )
})

SlidersPanel.displayName = "SlidersPanel"

export default SlidersPanel

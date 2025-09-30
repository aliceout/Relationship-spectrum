import { forwardRef } from "react"
import PresetBadge from "./PresetBadge"
import SliderRow from "./SliderRow"
import { dimensionGroups, getDimensionLabel } from "../lib/i18n"

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
    <section ref={ref} className="rounded-2xl border border-ink/5 bg-bg-card p-6 shadow-sm space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-ink">{translations.dimensionsTitle}</h2>
          <p className="text-sm text-ink-secondary">
            {translations.absence} / {translations.presence}
          </p>
        </div>
        {presetLabel && (
          <PresetBadge label={presetLabel} variant={isCustom ? "custom" : "default"} />
        )}
      </header>

      <div className="space-y-8">
        {dimensionGroups.map((group) => (
          <div key={group.id} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-secondary">
              {translations.groupLabels?.[group.labelKey] ?? group.labelKey}
            </h3>
            <div className="space-y-6">
              {group.dimensions.map((key) => (
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
          </div>
        ))}
      </div>
    </section>
  )
})

SlidersPanel.displayName = "SlidersPanel"

export default SlidersPanel

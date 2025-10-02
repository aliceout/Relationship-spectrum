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
  const neutralPoint = scale.min + (scale.max - scale.min) / 2
  const neutralLabel = labels?.neutral ?? (lang === "fr" ? "Neutre" : "Neutral")

  return (
    <section
      ref={ref}
      className="flex flex-col rounded-2xl border border-ink/5 bg-bg-card p-6 shadow-sm space-y-4 md:space-y-8"
    >
      {dimensionGroups.map((group) => (
        <div key={group.id} className="md:space-y-4 flex flex-col space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-secondary">
            {translations.groupLabels?.[group.labelKey] ?? group.labelKey}
          </h3>
          <div className="space-y-1 md:space-y-4">
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
                neutralLabel={neutralLabel}
                neutralValue={neutralPoint}
                onChange={onSliderChange}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
})

SlidersPanel.displayName = "SlidersPanel"

export default SlidersPanel

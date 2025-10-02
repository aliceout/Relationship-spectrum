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
  const showBadge = Boolean(presetLabel) || isCustom

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden rounded-[36px] border border-white/50 bg-white/[0.75] p-4 shadow-[0_40px_120px_-60px_rgba(243,107,164,0.6)] backdrop-blur-3xl transition md:p-8 space-y-5 md:space-y-8 dark:border-white/10 dark:bg-white/[0.08] dark:shadow-[0_45px_120px_-70px_rgba(123,108,246,0.6)]"
    >
      <span aria-hidden className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-24 right-[-40px] h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {showBadge && (
          <PresetBadge
            label={
              isCustom
                ? translations.customPreset ?? (lang === "fr" ? "Personnalis\u00E9" : "Custom")
                : presetLabel
            }
            variant={isCustom ? "custom" : "default"}
          />
        )}
      </header>

      {dimensionGroups.map((group) => (
        <div
          key={group.id}
          className="relative flex flex-col gap-4 rounded-2xl border border-white/45 bg-white/[0.65] p-4 shadow-[0_30px_80px_-55px_rgba(243,107,164,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_35px_90px_-60px_rgba(123,108,246,0.55)]"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-secondary/70">
            <span className="bg-gradient-to-r from-brand via-brand/80 to-accent bg-clip-text text-transparent">
              {translations.groupLabels?.[group.labelKey] ?? group.labelKey}
            </span>
          </h3>
          <div className="space-y-3 md:space-y-4">
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


const SidebarButtons = ({
  presets,
  selectedId,
  lang,
  onSelect,
  translations,
  isAnimating
}) => {
  return (
    <nav className="flex flex-col gap-2">
      {presets.map((preset) => {
        const label = lang === "fr" ? preset.label_fr : preset.label_en
        const isActive = selectedId === preset.id

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset)}
            disabled={isAnimating}
            className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isActive
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-ink/10 bg-bg-card text-ink hover:border-brand/40 hover:bg-brand/10"
            } ${isAnimating ? "opacity-70" : ""}`}
          >
            {label}
          </button>
        )
      })}
      {presets.length === 0 && (
        <p className="rounded-xl border border-dashed border-ink/10 bg-bg-card px-4 py-3 text-sm text-ink-secondary">
          {translations.loadError}
        </p>
      )}
    </nav>
  )
}

export default SidebarButtons

const SidebarButtons = ({
  presets,
  selectedId,
  lang,
  onSelect,
  translations,
  isAnimating
}) => {
  return (
    <nav className="flex flex-col gap-3">
      {presets.map((preset) => {
        const label = lang === "fr" ? preset.label_fr : preset.label_en
        const isActive = selectedId === preset.id

        const baseStyles =
          "w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        const activeStyles =
          "border border-transparent bg-gradient-to-r from-brand via-brand/95 to-accent text-white shadow-[0_25px_55px_-30px_rgba(243,107,164,0.65)]"
        const inactiveStyles =
          "border border-white/50 bg-white/[0.6] text-ink shadow-[0_20px_55px_-38px_rgba(243,107,164,0.45)] hover:border-brand/40 hover:bg-white/[0.8] hover:shadow-[0_25px_65px_-35px_rgba(243,107,164,0.55)] dark:border-white/10 dark:bg-white/[0.06] dark:text-ink dark:hover:bg-white/[0.12]"

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset)}
            disabled={isAnimating}
            className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles} ${isAnimating ? "opacity-70" : ""}`}
          >
            {label}
          </button>
        )
      })}
      {presets.length === 0 && (
        <p className="rounded-2xl border border-dashed border-white/40 bg-white/[0.5] px-4 py-3 text-sm text-ink-secondary shadow-[0_20px_60px_-50px_rgba(243,107,164,0.4)] backdrop-blur-md dark:border-white/15 dark:bg-white/[0.04]">
          {translations.loadError}
        </p>
      )}
    </nav>
  )
}

export default SidebarButtons


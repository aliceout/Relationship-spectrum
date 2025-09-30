import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"

const ThemeToggle = ({ value, resolvedTheme, onChange, translations }) => {
  const resolvedSystemDescriptor =
    resolvedTheme === "dark"
      ? translations.themeDark ?? "Dark"
      : translations.themeLight ?? "Light"

  const options = [
    {
      value: "light",
      label: translations.themeLight ?? "Light",
      icon: SunIcon,
      title: translations.themeLight ?? "Light"
    },
    {
      value: "system",
      label: translations.themeSystem ?? "System",
      icon: ComputerDesktopIcon,
      title: `${translations.themeSystem ?? "System"} (${resolvedSystemDescriptor})`
    },
    {
      value: "dark",
      label: translations.themeDark ?? "Dark",
      icon: MoonIcon,
      title: translations.themeDark ?? "Dark"
    }
  ]

  const currentIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  )

  const indicatorStyle = {
    transform: `translateX(${currentIndex * 100}%)`,
    width: "calc((100% - 0.5rem) / 3)"
  }

  return (
    <div className="relative inline-flex overflow-hidden rounded-xl border border-ink/10 bg-bg-card p-1 shadow-sm">
      <span className="sr-only">{translations.theme ?? "Theme"}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 rounded-lg bg-brand/10 transition-transform duration-200 ease-out"
        style={indicatorStyle}
      />
      {options.map((option) => {
        const isActive = option.value === value
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (option.value !== value) {
                onChange(option.value)
              }
            }}
            className={`relative z-10 inline-flex flex-1 items-center justify-center rounded-lg px-2 py-1 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              isActive ? "text-brand" : "text-ink-secondary hover:text-ink"
            }`}
            aria-pressed={isActive}
            aria-label={option.title}
            title={option.title}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggle

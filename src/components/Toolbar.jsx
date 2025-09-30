import { Bars3Icon, XMarkIcon, ArrowPathIcon, ShareIcon, ArrowDownTrayIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import ThemeToggle from "./ThemeToggle"

const ToolbarButton = ({ icon: Icon, label, onClick, variant = "primary" }) => {
  const base = "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  const styles =
    variant === "accent"
      ? "bg-accent text-white hover:bg-accent/90 focus-visible:outline-accent"
      : variant === "warn"
      ? "bg-warn text-white hover:bg-warn/90 focus-visible:outline-warn"
      : "bg-brand text-white hover:bg-brand/90 focus-visible:outline-brand"

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}

const Toolbar = ({
  lang,
  translations,
  onReset,
  onShare,
  onExport,
  onToggleLang,
  onToggleMenu,
  isMenuOpen,
  theme,
  resolvedTheme,
  onThemeChange
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-7">
        <button
          type="button"
          onClick={() => onToggleMenu(!isMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-bg-card text-ink shadow-sm hover:border-brand/40 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
          aria-label={isMenuOpen ? translations.close : translations.menu}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
        <div className="flex gap-2 items-center">
          <span className="hidden text-sm font-medium text-ink lg:inline">
            {translations.language}
          </span>
          <button
            type="button"
            onClick={onToggleLang}
            className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink shadow-sm hover:border-brand/40 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <GlobeAltIcon className="h-4 w-4" aria-hidden="true" />
            {lang}
          </button>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="text-sm font-medium text-ink">
            {translations.theme}
          </span>
          <ThemeToggle
            value={theme}
            resolvedTheme={resolvedTheme}
            onChange={onThemeChange}
            translations={translations}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ToolbarButton
          icon={ArrowPathIcon}
          label={translations.reset}
          onClick={onReset}
          variant="warn"
        />
        <ToolbarButton
          icon={ShareIcon}
          label={translations.share}
          onClick={onShare}
          variant="primary"
        />
        <ToolbarButton
          icon={ArrowDownTrayIcon}
          label={translations.exportPdf}
          onClick={onExport}
          variant="accent"
        />
      </div>
    </div>
  );
}

export default Toolbar



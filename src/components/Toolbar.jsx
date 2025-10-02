import { Bars3Icon, XMarkIcon, ArrowPathIcon, ShareIcon, ArrowDownTrayIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import ThemeToggle from "./ThemeToggle"

const ToolbarButton = ({ icon: Icon, label, onClick, variant = "primary" }) => {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_18px_45px_-35px_rgba(243,107,164,0.55)] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand hover:-translate-y-0.5"

  const styles =
    variant === "accent"
      ? "bg-gradient-to-r from-glow via-glow/95 to-accent text-ink"
      : variant === "warn"
      ? "bg-gradient-to-r from-warn via-[#FFB38A] to-[#FF9F85] text-white"
      : "bg-gradient-to-r from-brand via-brand/95 to-accent text-white"

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
    <div className="flex flex-col items-center justify-start gap-4 md:gap-6">
      <div className="flex w-full flex-row items-center justify-between gap-4 md:justify-end md:gap-7">
        <div className="flex items-center gap-2">
          <span className="hidden text-sm font-medium text-ink/80 lg:inline">
            {translations.language}
          </span>
          <button
            type="button"
            onClick={onToggleLang}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/[0.7] px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink shadow-[0_18px_50px_-35px_rgba(243,107,164,0.5)] transition hover:border-brand/40 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/10 dark:bg-white/[0.08]"
          >
            <GlobeAltIcon className="h-4 w-4" aria-hidden="true" />
            {lang}
          </button>
        </div>
        <div className="inline-flex items-center gap-2">
          <ThemeToggle
            value={theme}
            resolvedTheme={resolvedTheme}
            onChange={onThemeChange}
            translations={translations}
          />
        </div>
        <button
          type="button"
          onClick={() => onToggleMenu(!isMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/[0.7] text-ink shadow-[0_15px_40px_-30px_rgba(243,107,164,0.45)] transition hover:border-brand/40 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] lg:hidden"
          aria-label={isMenuOpen ? translations.close : translations.menu}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
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


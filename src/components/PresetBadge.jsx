const PresetBadge = ({ label, variant = "default" }) => {
  const styles =
    variant === "custom"
      ? "border border-warn/40 bg-warn/20 text-warn shadow-[0_10px_30px_-20px_rgba(255,139,100,0.6)]"
      : "border border-brand/30 bg-gradient-to-r from-brand/15 via-brand/10 to-accent/20 text-brand shadow-[0_10px_30px_-18px_rgba(243,107,164,0.55)]"

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] ${styles}`}>
      {label}
    </span>
  )
}

export default PresetBadge

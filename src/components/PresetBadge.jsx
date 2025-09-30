const PresetBadge = ({ label, variant = "default" }) => {
  const styles =
    variant === "custom"
      ? "bg-warn/10 text-warn border border-warn/30"
      : "bg-brand/10 text-brand border border-brand/20"

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {label}
    </span>
  )
}

export default PresetBadge

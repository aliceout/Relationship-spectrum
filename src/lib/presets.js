const REQUIRED_FIELDS = ["id", "label_fr", "label_en", "values"]

const hasValidValues = (values) =>
  values &&
  [
    "romantisme",
    "sexualite",
    "amitie",
    "intimite_emotionnelle",
    "intimite_physique",
    "exclusivite_physique_sexuelle",
    "exclusivite_emotionnelle"
  ].every((key) => typeof values[key] === "number")

const sanitizePreset = (preset) => {
  const missing = REQUIRED_FIELDS.filter((field) => !(field in preset))
  if (missing.length > 0 || !hasValidValues(preset.values)) {
    return null
  }

  return {
    id: preset.id,
    label_fr: preset.label_fr,
    label_en: preset.label_en,
    values: preset.values
  }
}

export const loadPresets = async () => {
  const response = await fetch("/presets.json")
  if (!response.ok) {
    throw new Error(`Failed to load presets: ${response.status}`)
  }

  const payload = await response.json()
  if (!payload || !Array.isArray(payload.presets)) {
    throw new Error("Invalid presets format")
  }

  const sanitized = payload.presets
    .map(sanitizePreset)
    .filter(Boolean)

  if (sanitized.length === 0) {
    throw new Error("No valid presets found")
  }

  return {
    presets: sanitized,
    scale: payload.scale ?? { min: 0, max: 10, step: 1 },
    labels: payload.labels ?? { min: "Absence", max: "Présence" }
  }
}

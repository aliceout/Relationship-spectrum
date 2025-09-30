export const dimensionKeys = [
  "romantisme",
  "sexualite",
  "amitie",
  "intimite_emotionnelle",
  "intimite_physique",
  "exclusivite_physique_sexuelle",
  "exclusivite_emotionnelle"
]

export const translations = {
  fr: {
    appTitle: "Spectre relationnel",
    relations: "Relations",
    dimensionsTitle: "Dimensions",
    absence: "Absence",
    presence: "Présence",
    custom: "Personnaliser",
    reset: "Réinitialiser",
    share: "Partager",
    sharePrompt: "Copiez ce lien pour le partager",
    exportPdf: "Exporter PDF",
    language: "Langue",
    menu: "Menu",
    close: "Fermer",
    valuesLegend: "Valeurs",
    loadError: "Impossible de charger les presets",
    clipboardSuccess: "Lien copié dans le presse-papiers",
    clipboardError: "Échec de la copie du lien",
    pdfError: "Impossible de générer le PDF",
    dimensions: {
      romantisme: "Romantisme",
      sexualite: "Sexualité",
      amitie: "Amitié",
      intimite_emotionnelle: "Intimité émotionnelle",
      intimite_physique: "Intimité physique",
      exclusivite_physique_sexuelle: "Exclusivité physique/sexuelle",
      exclusivite_emotionnelle: "Exclusivité émotionnelle"
    }
  },
  en: {
    appTitle: "Relationship Spectrum",
    relations: "Relationships",
    dimensionsTitle: "Dimensions",
    absence: "Absence",
    presence: "Presence",
    custom: "Custom",
    reset: "Reset",
    share: "Share",
    sharePrompt: "Copy this link to share",
    exportPdf: "Export PDF",
    language: "Language",
    menu: "Menu",
    close: "Close",
    valuesLegend: "Values",
    loadError: "Unable to load presets",
    clipboardSuccess: "Link copied to clipboard",
    clipboardError: "Failed to copy link",
    pdfError: "Unable to generate PDF",
    dimensions: {
      romantisme: "Romanticism",
      sexualite: "Sexuality",
      amitie: "Friendship",
      intimite_emotionnelle: "Emotional intimacy",
      intimite_physique: "Physical intimacy",
      exclusivite_physique_sexuelle: "Physical/sexual exclusivity",
      exclusivite_emotionnelle: "Emotional exclusivity"
    }
  }
}

export const supportedLanguages = Object.keys(translations)

export const isSupportedLanguage = (lang) => supportedLanguages.includes(lang)

export const getTranslation = (lang, key) => translations[lang]?.[key]

export const getDimensionLabel = (lang, dimension) =>
  translations[lang]?.dimensions?.[dimension] ?? dimension

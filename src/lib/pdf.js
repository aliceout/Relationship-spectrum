import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import { translations, dimensionKeys, getDimensionLabel } from "./i18n"

export const exportSlidersPanelToPdf = async ({
  element,
  lang,
  values,
  presetLabel
}) => {
  if (!element) {
    throw new Error("Missing element to export")
  }

  const t = translations[lang] ?? translations.fr

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: "#FFFFFF",
      scale: window.devicePixelRatio || 1
    })

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 14
    const availableWidth = pageWidth - margin * 2

    const imageWidth = availableWidth
    const imageHeight = (canvas.height * imageWidth) / canvas.width
    const imageData = canvas.toDataURL("image/png")

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(18)
    pdf.text(t.appTitle, margin, 20)

    pdf.setFontSize(12)
    pdf.setFont("helvetica", "normal")
    const presetText = presetLabel ? `${t.valuesLegend}: ${presetLabel}` : `${t.valuesLegend}: ${t.custom}`
    pdf.text(presetText, margin, 28)

    pdf.addImage(imageData, "PNG", margin, 34, imageWidth, imageHeight)

    const startY = 40 + imageHeight
    let currentY = startY

    pdf.setFont("helvetica", "bold")
    pdf.text(t.dimensionsTitle, margin, currentY)
    currentY += 6
    pdf.setFont("helvetica", "normal")

    dimensionKeys.forEach((key) => {
      const label = getDimensionLabel(lang, key)
      const value = values[key] ?? 0
      pdf.text(`${label}: ${value}/10`, margin, currentY)
      currentY += 6
    })

    pdf.save(`relationship-spectrum-${Date.now()}.pdf`)
  } catch (error) {
    console.error("Failed to export PDF", error)
    throw error
  }
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import SidebarButtons from "./components/SidebarButtons"
import SlidersPanel from "./components/SlidersPanel"
import Toolbar from "./components/Toolbar"
import { createSharePayload, buildShareUrl, decodeState } from "./lib/encodeState"
import { exportSlidersPanelToPdf } from "./lib/pdf"
import {
  dimensionKeys,
  translations as dictionary,
  isSupportedLanguage
} from "./lib/i18n"
import { loadPresets } from "./lib/presets"

const defaultScale = { min: 0, max: 10, step: 1 }
const defaultLabels = { min: "Absence", max: "Présence" }

const createDefaultValues = (min = defaultScale.min) =>
  dimensionKeys.reduce((acc, key) => {
    acc[key] = min
    return acc
  }, {})

const clampToScale = (value, scale) => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return scale.min
  return Math.min(scale.max, Math.max(scale.min, numeric))
}

const THEME_STORAGE_KEY = "theme-preference"

const getStoredThemePreference = () => {
  if (typeof window === "undefined") return "system"
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system"
}

const getSystemThemePreference = () => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function App() {
  const [theme, setTheme] = useState(getStoredThemePreference)
  const [systemTheme, setSystemTheme] = useState(getSystemThemePreference)
  const [lang, setLang] = useState("fr")
  const [presets, setPresets] = useState([])
  const [scale, setScale] = useState(defaultScale)
  const [labels, setLabels] = useState(defaultLabels)
  const [values, setValues] = useState(createDefaultValues())
  const [selectedPresetId, setSelectedPresetId] = useState(null)
  const [isCustom, setIsCustom] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [status, setStatus] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const slidersRef = useRef(null)
  const animationRef = useRef(null)
  const valuesRef = useRef(values)

  const t = dictionary[lang] ?? dictionary.fr
  const appliedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light")
    }

    handleChange(media)

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange)
      return () => media.removeEventListener("change", handleChange)
    }

    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return

    const root = document.documentElement
    if (appliedTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [appliedTheme])


  const hydrateFromUrl = useCallback((presetList, scaleData) => {
    try {
      const params = new URLSearchParams(window.location.search)
      const encoded = params.get("s")
      if (!encoded) return

      const decoded = decodeState(encoded)
      if (!decoded) return

      if (decoded.lang && isSupportedLanguage(decoded.lang)) {
        setLang(decoded.lang)
      }

      if (decoded.values && typeof decoded.values === "object") {
        const baseline = createDefaultValues(scaleData.min ?? defaultScale.min)
        dimensionKeys.forEach((key) => {
          baseline[key] = clampToScale(decoded.values[key], {
            min: scaleData.min ?? defaultScale.min,
            max: scaleData.max ?? defaultScale.max
          })
        })
        setValues(baseline)
        valuesRef.current = baseline
      }

      if (decoded.presetId && presetList.some((preset) => preset.id === decoded.presetId)) {
        setSelectedPresetId(decoded.presetId)
        setIsCustom(false)
      } else {
        setSelectedPresetId(null)
        setIsCustom(true)
      }
    } catch (error) {
      console.error("Failed to hydrate state from URL", error)
    }
  }, [])

  const activePreset = useMemo(
    () => presets.find((preset) => preset.id === selectedPresetId) ?? null,
    [presets, selectedPresetId]
  )

  const presetLabel = useMemo(() => {
    if (isCustom) {
      return t.custom
    }

    if (!activePreset) {
      return null
    }

    return lang === "fr" ? activePreset.label_fr : activePreset.label_en
  }, [activePreset, isCustom, lang, t.custom])

  const animateToValues = useCallback(
    (targetValues) => {
      if (!targetValues) return

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      const startValues = { ...valuesRef.current }
      const duration = 350
      const startTime = performance.now()

      const step = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 0.5 - Math.cos(progress * Math.PI) / 2

        const nextValues = {}
        dimensionKeys.forEach((key) => {
          const start = startValues[key] ?? scale.min
          const end = clampToScale(targetValues[key], scale)
          nextValues[key] = Math.round(start + (end - start) * eased)
        })

        setValues(nextValues)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step)
        } else {
          setIsAnimating(false)
          animationRef.current = null
        }
      }

      setIsAnimating(true)
      animationRef.current = requestAnimationFrame(step)
    },
    [scale]
  )

  useEffect(() => {
    valuesRef.current = values
  }, [values])

  useEffect(() => {
    let active = true

    loadPresets()
      .then((data) => {
        if (!active) return
        setPresets(data.presets)
        setScale(data.scale ?? defaultScale)
        setLabels(data.labels ?? defaultLabels)
        const baseline = createDefaultValues(data.scale?.min ?? defaultScale.min)
        setValues(baseline)
        valuesRef.current = baseline
        hydrateFromUrl(data.presets, data.scale ?? defaultScale)
      })
      .catch((error) => {
        console.error(error)
        if (active) {
          setStatus({ type: "error", message: dictionary.fr.loadError })
        }
      })

    return () => {
      active = false
    }
  }, [hydrateFromUrl])

  useEffect(() => {
    if (!status) return undefined
    const timeout = window.setTimeout(() => setStatus(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [status])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handlePresetSelect = (preset) => {
    if (!preset) return
    setSelectedPresetId(preset.id)
    setIsCustom(false)
    setIsMenuOpen(false)
    animateToValues(preset.values)

    const url = new URL(window.location.href)
    url.searchParams.delete("s")
    window.history.replaceState({}, "", url.toString())
  }

  const handleSliderChange = (key, value) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    const nextValue = clampToScale(value, scale)
    setValues((prev) => ({
      ...prev,
      [key]: nextValue
    }))
    setSelectedPresetId(null)
    setIsCustom(true)
    setIsAnimating(false)
  }

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    const baseline = createDefaultValues(scale.min)
    setValues(baseline)
    setSelectedPresetId(null)
    setIsCustom(false)
    setIsAnimating(false)
    setStatus(null)

    const url = new URL(window.location.href)
    url.searchParams.delete("s")
    window.history.replaceState({}, "", url.toString())
  }

  const handleShare = async () => {
    try {
      const payload = createSharePayload({
        values,
        lang,
        presetId: isCustom ? null : selectedPresetId
      })
      const shareUrl = buildShareUrl(payload)

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        setStatus({ type: "success", message: t.clipboardSuccess })
      } else {
        window.prompt(t.sharePrompt, shareUrl)
        setStatus({ type: "success", message: t.clipboardSuccess })
      }

      window.history.replaceState({}, "", shareUrl)
    } catch (error) {
      console.error("Share failed", error)
      setStatus({ type: "error", message: t.clipboardError })
    }
  }

  const handleExportPdf = async () => {
    if (!slidersRef.current) return
    try {
      await exportSlidersPanelToPdf({
        element: slidersRef.current,
        lang,
        values,
        presetLabel
      })
    } catch (error) {
      console.error("Export PDF failed", error)
      setStatus({ type: "error", message: t.pdfError })
    }
  }

  const toggleLanguage = () => {
    setLang((current) => (current === "fr" ? "en" : "fr"))
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-2xl border border-ink/5 bg-bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-ink">{t.relations}</h2>
              <SidebarButtons
                presets={presets}
                selectedId={selectedPresetId}
                lang={lang}
                translations={t}
                onSelect={handlePresetSelect}
                isAnimating={isAnimating}
              />
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6 pb-10">
          <section className="space-y-4 rounded-2xl border border-ink/5 bg-bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-ink">{t.appTitle}</h1>
              </div>
            </div>
            <Toolbar
              lang={lang}
              translations={t}
              onReset={handleReset}
              onShare={handleShare}
              onExport={handleExportPdf}
              onToggleLang={toggleLanguage}
              onToggleMenu={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
              theme={theme}
              resolvedTheme={appliedTheme}
              onThemeChange={setTheme}
            />
          </section>

          <SlidersPanel
            ref={slidersRef}
            values={values}
            scale={scale}
            labels={labels}
            translations={t}
            lang={lang}
            onSliderChange={handleSliderChange}
            presetLabel={presetLabel}
            isCustom={isCustom}
          />

          {status && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${
                status.type === "error"
                  ? "border-warn/40 bg-warn/10 text-warn"
                  : "border-accent/40 bg-accent/10 text-accent"
              }`}
            >
              {status.message}
            </div>
          )}
        </main>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setIsMenuOpen(false)} />
          <aside className="relative ml-auto flex h-full w-72 flex-col gap-4 bg-bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">{t.relations}</h2>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-ink hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label={t.close}
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <SidebarButtons
              presets={presets}
              selectedId={selectedPresetId}
              lang={lang}
              translations={t}
              onSelect={handlePresetSelect}
              isAnimating={isAnimating}
            />
          </aside>
        </div>
      )}
    </div>
  )
}

export default App



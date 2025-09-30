import { useState, useEffect } from 'react'
import { compress, decompress } from 'lz-string'
import { jsPDF } from 'jspdf'

const translations = {
  fr: {
    title: 'Spectre relationnel',
    dimensions: {
      romantisme: 'Romantisme',
      sexualite: 'Sexualité',
      amitie: 'Amitié',
      intimite_emotionnelle: 'Intimité émotionnelle',
      intimite_physique: 'Intimité physique',
      exclusivite_physique_sexuelle: 'Exclusivité physique/sexuelle',
      exclusivite_emotionnelle: 'Exclusivité émotionnelle'
    },
    absence: 'Absence',
    presence: 'Présence',
    custom: 'Personnalisé',
    reset: 'Réinitialiser',
    share: 'Partager',
    exportPDF: 'Exporter PDF',
    menu: 'Menu',
    close: 'Fermer'
  },
  en: {
    title: 'Relationship Spectrum',
    dimensions: {
      romantisme: 'Romanticism',
      sexualite: 'Sexuality',
      amitie: 'Friendship',
      intimite_emotionnelle: 'Emotional intimacy',
      intimite_physique: 'Physical intimacy',
      exclusivite_physique_sexuelle: 'Physical/sexual exclusivity',
      exclusivite_emotionnelle: 'Emotional exclusivity'
    },
    absence: 'Absence',
    presence: 'Presence',
    custom: 'Custom',
    reset: 'Reset',
    share: 'Share',
    exportPDF: 'Export PDF',
    menu: 'Menu',
    close: 'Close'
  }
}

const dimensionKeys = [
  'romantisme',
  'sexualite',
  'amitie',
  'intimite_emotionnelle',
  'intimite_physique',
  'exclusivite_physique_sexuelle',
  'exclusivite_emotionnelle'
]

function App() {
  const [lang, setLang] = useState('fr')
  const [presets, setPresets] = useState([])
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [values, setValues] = useState({
    romantisme: 0,
    sexualite: 0,
    amitie: 0,
    intimite_emotionnelle: 0,
    intimite_physique: 0,
    exclusivite_physique_sexuelle: 0,
    exclusivite_emotionnelle: 0
  })
  const [isCustom, setIsCustom] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[lang]

  // Load presets
  useEffect(() => {
    fetch('/presets.json')
      .then(res => res.json())
      .then(data => setPresets(data.presets))
      .catch(err => console.error('Error loading presets:', err))
  }, [])

  // Load state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const state = params.get('state')
    if (state) {
      try {
        const decoded = decompress(state)
        const data = JSON.parse(decoded)
        if (data.values) {
          setValues(data.values)
          setIsCustom(true)
        }
        if (data.lang) {
          setLang(data.lang)
        }
      } catch (e) {
        console.error('Error decoding state:', e)
      }
    }
  }, [])

  const handlePresetClick = (preset) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setSelectedPreset(preset.id)
    setIsCustom(false)
    setMobileMenuOpen(false)
    
    // Animate sliders
    const startValues = { ...values }
    const endValues = preset.values
    const duration = 300
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const newValues = {}
      dimensionKeys.forEach(key => {
        const start = startValues[key] || 0
        const end = endValues[key] || 0
        newValues[key] = Math.round(start + (end - start) * progress)
      })
      
      setValues(newValues)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }
    
    animate()
  }

  const handleSliderChange = (dimension, value) => {
    const newValues = { ...values, [dimension]: parseInt(value) }
    setValues(newValues)
    
    // Check if custom
    if (selectedPreset) {
      const preset = presets.find(p => p.id === selectedPreset)
      if (preset) {
        const isMatch = dimensionKeys.every(key => 
          newValues[key] === (preset.values[key] || 0)
        )
        if (!isMatch) {
          setIsCustom(true)
          setSelectedPreset(null)
        }
      }
    } else {
      setIsCustom(true)
    }
  }

  const handleReset = () => {
    const resetValues = {}
    dimensionKeys.forEach(key => {
      resetValues[key] = 0
    })
    setValues(resetValues)
    setSelectedPreset(null)
    setIsCustom(false)
  }

  const handleShare = () => {
    const state = {
      values,
      lang
    }
    const compressed = compress(JSON.stringify(state))
    const url = `${window.location.origin}${window.location.pathname}?state=${compressed}`
    
    navigator.clipboard.writeText(url).then(() => {
      alert(lang === 'fr' ? 'Lien copié!' : 'Link copied!')
    }).catch(() => {
      alert(lang === 'fr' ? 'Erreur lors de la copie' : 'Error copying')
    })
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(20)
    doc.text(t.title, 20, 20)
    
    let y = 40
    dimensionKeys.forEach(key => {
      doc.setFontSize(12)
      doc.text(`${t.dimensions[key]}: ${values[key]}/10`, 20, y)
      y += 10
    })
    
    doc.save('relationship-spectrum.pdf')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <div className="flex gap-2 items-center">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="px-3 py-1 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden px-3 py-1 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded transition"
              >
                {mobileMenuOpen ? t.close : t.menu}
              </button>
              
              {/* Action buttons */}
              <button
                onClick={handleShare}
                className="hidden sm:block px-3 py-1 text-sm font-medium bg-green-500 text-white hover:bg-green-600 rounded transition"
              >
                {t.share}
              </button>
              <button
                onClick={handleExportPDF}
                className="hidden sm:block px-3 py-1 text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 rounded transition"
              >
                {t.exportPDF}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Presets (Desktop) */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                {lang === 'fr' ? 'Relations' : 'Relationships'}
              </h2>
              <div className="space-y-2">
                {presets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      selectedPreset === preset.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    disabled={isAnimating}
                  >
                    {lang === 'fr' ? preset.name_fr : preset.name_en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-semibold mb-4">
                  {lang === 'fr' ? 'Relations' : 'Relationships'}
                </h2>
                <div className="space-y-2">
                  {presets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetClick(preset)}
                      className={`w-full text-left px-4 py-2 rounded transition ${
                        selectedPreset === preset.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      disabled={isAnimating}
                    >
                      {lang === 'fr' ? preset.name_fr : preset.name_en}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => {
                      handleShare()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-sm font-medium bg-green-500 text-white hover:bg-green-600 rounded transition"
                  >
                    {t.share}
                  </button>
                  <button
                    onClick={() => {
                      handleExportPDF()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 rounded transition"
                  >
                    {t.exportPDF}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right column - Sliders */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {lang === 'fr' ? 'Dimensions' : 'Dimensions'}
                </h2>
                <div className="flex gap-2 items-center">
                  {isCustom && (
                    <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      {t.custom}
                    </span>
                  )}
                  <button
                    onClick={handleReset}
                    className="px-3 py-1 text-sm font-medium bg-red-500 text-white hover:bg-red-600 rounded transition"
                  >
                    {t.reset}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {dimensionKeys.map(key => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t.dimensions[key]}
                      </label>
                      <span className="text-sm font-semibold text-gray-900 min-w-[2rem] text-right">
                        {values[key]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-16">{t.absence}</span>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={values[key]}
                        onChange={(e) => handleSliderChange(key, e.target.value)}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <span className="text-xs text-gray-500 w-16 text-right">{t.presence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

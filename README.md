# Relationship Spectrum

A visual tool to explore and visualize different relationship dimensions on a spectrum.

![Relationship Spectrum Preview](https://github.com/user-attachments/assets/42217464-dbf8-459e-a9ff-288d503f0afa)

## Features

- 📊 **7 Relationship Dimensions**: Visualize romanticism, sexuality, friendship, emotional intimacy, physical intimacy, and exclusivity (both physical/sexual and emotional)
- 🎨 **Preset Relationships**: Quickly load common relationship types (Romantic, Friendship, Casual, Queerplatonic, Polyamorous, Aromantic)
- ✨ **Smooth Animations**: Sliders animate smoothly (300ms) when loading presets
- 🏷️ **Custom Badge**: Automatic "Custom" badge when you modify preset values
- 🌐 **Bilingual**: Switch between French and English
- 🔗 **URL Sharing**: Share your relationship spectrum via compressed URL using lz-string
- 📄 **PDF Export**: Export your relationship spectrum to PDF
- 📱 **Mobile Responsive**: Drawer navigation that auto-closes on selection
- 🔄 **Reset Function**: Quickly reset all values to 0

## Tech Stack

- **Vite** - Fast build tool
- **React** - UI framework
- **Tailwind CSS v4** - Utility-first CSS framework
- **lz-string** - URL state compression
- **jsPDF** - PDF generation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Select a Preset**: Click on any relationship type button (e.g., "Romantic", "Friendship") to see the sliders animate to preset values
2. **Customize**: Adjust any slider to customize the relationship spectrum - a "Custom" badge will appear
3. **Share**: Click the "Share" button to copy a URL with your current configuration
4. **Export**: Click "Export PDF" to save your relationship spectrum
5. **Reset**: Click "Reset" to return all sliders to 0
6. **Switch Language**: Toggle between FR/EN using the language button

## Dimensions

Each dimension is measured on a scale from 0 (Absence) to 10 (Presence):

- **Romanticism** (Romantisme): Romantic feelings and attraction
- **Sexuality** (Sexualité): Sexual attraction and activity
- **Friendship** (Amitié): Platonic friendship bond
- **Emotional Intimacy** (Intimité émotionnelle): Deep emotional connection and vulnerability
- **Physical Intimacy** (Intimité physique): Non-sexual physical closeness
- **Physical/Sexual Exclusivity** (Exclusivité physique/sexuelle): Expectation of physical/sexual exclusivity
- **Emotional Exclusivity** (Exclusivité émotionnelle): Expectation of emotional exclusivity

## License

This project is licensed under the Mozilla Public License Version 2.0 (MPL-2.0). See the [LICENSE](LICENSE) file for details.

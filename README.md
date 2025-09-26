# TPB ROI Calculator

> **🚀 Standalone ROI Calculator** - Interactive kiosk solutions ROI analysis tool for The Peak Beyond.

## 🎯 Overview

This is a clean, standalone version of the TPB ROI Calculator extracted from the larger marketing powerhouse project. It provides a focused, embeddable ROI analysis tool for interactive kiosk solutions.

## ✨ Features

- **Interactive ROI Calculator** with real-time calculations
- **Package Selection** - Small, Medium, Large, High Flower, and Franchise Model packages
- **Multi-year Projections** - 3-year ROI analysis with payback periods
- **Professional Export** - Snapshot export with comprehensive business context
- **Responsive Design** - Works on all devices
- **Embeddable Widget** - Can be embedded in external websites
- **TPB Branding** - Consistent with The Peak Beyond brand guidelines

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📦 Available Packages

| Package | CapEx | Monthly | Features |
|---------|-------|---------|----------|
| Small | $6,752 | $300 | 2× 8-jar Flower stations |
| **Franchise Model 20+** | **$8,854** | **$250** | **4× 8-jar Flower stations** |
| Medium | $12,830 | $550 | 4× 8-jar + 4× Pick-n-Place |
| High Flower | $12,300 | $600 | 4× 16-jar Flower stations |
| Large | $17,080 | $600 | 4× 16-jar + 4× Pick-n-Place |

## 🛠 Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **HTML2Canvas** - Export functionality

## 📁 Project Structure

```
tpb-roi-calculator/
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document wrapper
│   ├── index.tsx         # Redirects to ROI tool
│   └── roi-tool.tsx      # Main ROI calculator page
├── components/
│   ├── ROICalculator.tsx # Input form component
│   ├── ROIResults.tsx    # Results display
│   ├── ROIVisualization.tsx # Charts
│   ├── ROIWidget.tsx     # Main widget component
│   └── TPB*.tsx          # TPB branding components
├── data/
│   └── packages.json     # Package definitions
├── hooks/
│   └── useROICalculations.ts # ROI calculation logic
├── utils/
│   └── roiCalculations.ts # Core calculation functions
└── styles/
    └── globals.css       # Global styles
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Build with `npm run build`, deploy `.next` folder
- **Railway/Render**: Deploy as Node.js app

## 🔧 Customization

### Adding New Packages

Edit `data/packages.json`:

```json
{
  "key": "New Package",
  "capex": 10000,
  "monthly": 400,
  "includes": "Description of what's included"
}
```

### Updating Branding

- Colors: `tailwind.config.js`
- Fonts: `styles/globals.css`
- Logo: `components/TPB*.tsx`

## 📱 Embedding

The ROI calculator can be embedded in external websites:

```html
<iframe 
  src="https://your-domain.com" 
  width="100%" 
  height="800" 
  frameborder="0"
  title="TPB ROI Calculator">
</iframe>
```

## 📄 License

Private - The Peak Beyond

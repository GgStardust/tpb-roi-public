import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="description" content="The Peak Beyond ROI Calculator - Calculate return on investment for interactive kiosk solutions in cannabis retail" />
        <meta name="keywords" content="ROI calculator, cannabis retail, interactive kiosks, investment calculator, dispensary technology, retail ROI" />
        <meta name="author" content="The Peak Beyond" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TPB ROI Calculator - Interactive Kiosk Investment Calculator" />
        <meta property="og:description" content="Calculate the return on investment for interactive kiosk solutions. See ROI projections, payback periods, and multi-location franchise calculations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tpb-roi.vercel.app" />
        <meta property="og:site_name" content="The Peak Beyond ROI Calculator" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TPB ROI Calculator - Interactive Kiosk Investment Calculator" />
        <meta name="twitter:description" content="Calculate ROI for interactive kiosk solutions with detailed projections and franchise multi-location support." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "TPB ROI Calculator",
              "description": "Interactive ROI calculator for cannabis retail kiosk investments with franchise multi-location support",
              "url": "https://tpb-roi.vercel.app",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Peak Beyond",
                "url": "https://thepeakbeyond.com"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

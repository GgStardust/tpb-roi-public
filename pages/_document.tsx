import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="description" content="TPB Marketing Powerhouse - AI-Powered Marketing Automation Platform for Cannabis Retail and Beyond" />
        <meta name="keywords" content="cannabis retail technology, marketing automation, AI content generation, dispensary technology, retail kiosks" />
        <meta name="author" content="The Peak Beyond" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TPB Marketing Powerhouse - AI Marketing Automation" />
        <meta property="og:description" content="Transform your marketing operations with intelligent campaign generation, multi-channel publishing, and performance optimization." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tpb-marketing-powerhouse.vercel.app" />
        <meta property="og:image" content="https://tpb-marketing-powerhouse.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="TPB Marketing Powerhouse" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TPB Marketing Powerhouse - AI Marketing Automation" />
        <meta name="twitter:description" content="Transform your marketing operations with intelligent campaign generation and multi-channel publishing." />
        <meta name="twitter:image" content="https://tpb-marketing-powerhouse.vercel.app/og-image.jpg" />
        
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
              "@type": "SoftwareApplication",
              "name": "TPB Marketing Powerhouse",
              "description": "AI-Powered Marketing Automation Platform for Cannabis Retail and Beyond",
              "url": "https://tpb-marketing-powerhouse.vercel.app",
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

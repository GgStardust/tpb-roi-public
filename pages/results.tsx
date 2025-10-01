import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useROICalculations } from '../hooks/useROICalculations';
import TPBHeader from '../components/TPBHeader';
import MultiLocationROI from '../components/MultiLocationROI';
import { generateROISnapshot } from '../utils/roiCalculations';
import html2canvas from 'html2canvas';

export default function ResultsPage() {
  const router = useRouter();
  const { inputs, result, updateInput, packages } = useROICalculations();

  // Handle URL parameters to override default values
  useEffect(() => {
    if (router.isReady && router.query) {
      const { pkg, revenue, uplift, margin, extraCapex } = router.query;
      
      if (pkg || revenue || uplift || margin || extraCapex) {
        updateInput('pkgKey', pkg as string || inputs.pkgKey);
        updateInput('revenue', revenue ? Number(revenue) : inputs.revenue);
        updateInput('upliftPct', uplift ? Number(uplift) : inputs.upliftPct);
        updateInput('marginPct', margin ? Number(margin) : inputs.marginPct);
        updateInput('extraCapex', extraCapex ? Number(extraCapex) : inputs.extraCapex);
      }
    }
  }, [router.isReady, router.query, updateInput, inputs.pkgKey, inputs.revenue, inputs.upliftPct, inputs.marginPct, inputs.extraCapex]);
  const [showMultiLocation, setShowMultiLocation] = useState(false);

  // Handle PNG export
  const handlePNGExport = () => {
    const element = document.getElementById('roi-results');
    if (element) {
      // Temporarily show the element for PNG generation
      element.style.display = 'block';
      
      html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true
      }).then(canvas => {
        // Hide the element again after PNG generation
        element.style.display = 'none';
        
        const link = document.createElement('a');
        link.download = `TPB-ROI-${result.pkg}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }).catch(error => {
        // Hide the element even if there's an error
        element.style.display = 'none';
        console.error('Error generating PNG:', error);
        alert('Error generating PNG. Please try again.');
      });
    } else {
      console.error('Element with id "roi-results" not found');
      alert('Error: Could not find results element to export.');
    }
  };

  // Handle snapshot export
  const handleSnapshotExport = () => {
    const snapshot = generateROISnapshot(inputs, result);
    navigator.clipboard.writeText(snapshot);
    alert("ROI Snapshot copied to clipboard!");
  };

  const handleBackToCalculator = () => {
    router.push('/calculator');
  };

  const handleStartOver = () => {
    router.push('/intro');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TPBHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Step 3 of 3: Your ROI Results
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-tpb-green h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Results Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tpb-dark mb-2">
            Your ROI Analysis
          </h1>
          <p className="text-gray-600">
            Based on your {inputs.pkgKey} package with {inputs.upliftPct}% uplift projection
          </p>
        </div>

        {/* Narrative Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-tpb-dark mb-4">Your ROI analysis</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At {inputs.upliftPct}% uplift, your {inputs.pkgKey} investment pays for itself in {result.paybackMonths?.toFixed(1) || "N/A"} months and generates ${result.monthlyNet.toLocaleString()} in net profit each month. Cumulative profit over 3 years is ${result.cumulative3Year.toLocaleString()}.
          </p>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {/* Package Investment */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              ${result.capex.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-1">{result.pkg} Package</div>
            <div className="text-xs text-gray-500">+ ${result.monthlyFees}/mo</div>
          </div>

          {/* Payback Period - Most Important */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border-l-4 border-tpb-green">
            <div className="text-3xl font-bold text-tpb-green mb-2">
              {result.paybackMonths?.toFixed(1) || "N/A"}
            </div>
            <div className="text-sm text-gray-600 mb-1">Months to Payback</div>
            <div className="text-xs text-gray-500">Your investment pays for itself</div>
          </div>

          {/* Monthly Net Increase */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border-l-4 border-tpb-orange">
            <div className="text-3xl font-bold text-tpb-orange mb-2">
              ${result.monthlyNet.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-1">Monthly Net Increase</div>
            <div className="text-xs text-gray-500">After all fees and costs</div>
          </div>

          {/* Year-1 ROI */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border-l-4 border-tpb-slate">
            <div className="text-3xl font-bold text-tpb-slate mb-2">
              {result.year1Roi ? `${(result.year1Roi * 100).toFixed(0)}%` : "N/A"}
            </div>
            <div className="text-sm text-gray-600 mb-1">Year-1 ROI</div>
            <div className="text-xs text-gray-500">Return on investment</div>
          </div>

          {/* 3-Year Total */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border-l-4 border-tpb-green">
            <div className="text-3xl font-bold text-tpb-green mb-2">
              ${result.cumulative3Year.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-1">3-Year Total</div>
            <div className="text-xs text-gray-500">Cumulative profit</div>
          </div>
        </div>

        {/* Package Contents */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-tpb-dark mb-4">Package Contents</h3>
          <div>
            <h4 className="font-medium text-tpb-dark mb-3">What's Included in Your {result.pkg} Package:</h4>
            <div className="space-y-2">
              {(() => {
                const selectedPackage = packages.find(p => p.key === result.pkg);
                return selectedPackage ? selectedPackage.includes.split(', ').map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-tpb-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{item.trim()}</span>
                  </div>
                )) : "Package details not available";
              })()}
            </div>
          </div>
        </div>

        {/* ROI Results - For PNG Export (Hidden from main view) */}
        <div id="roi-results" className="mb-12" style={{ display: 'none' }}>
          <div className="bg-white p-8 max-w-4xl mx-auto" style={{ minHeight: '600px' }}>
            {/* Header for PNG Export */}
            <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
              <h1 className="text-3xl font-bold text-tpb-dark mb-2">Interactive Kiosk ROI Analysis</h1>
              <p className="text-lg text-gray-600">The Peak Beyond | {new Date().toLocaleDateString()}</p>
            </div>

            {/* Key Metrics Dashboard - 2x3 Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Package Investment */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm flex items-center justify-center">P</span>
                  </div>
                  <h3 className="font-semibold text-tpb-dark">Package Investment</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${result.capex.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{result.pkg} Package</div>
                <div className="text-xs text-gray-500">+ ${result.monthlyFees}/mo</div>
              </div>

              {/* Payback Period */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-tpb-green">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-tpb-green rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm flex items-center justify-center">T</span>
                  </div>
                  <h3 className="font-semibold text-tpb-dark">Payback Period</h3>
                </div>
                <div className="text-4xl font-bold text-tpb-green mb-2">
                  {result.paybackMonths?.toFixed(1) || "N/A"}
                </div>
                <div className="text-sm text-gray-600">months to break even</div>
              </div>

              {/* Monthly Net */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-tpb-orange">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-tpb-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm flex items-center justify-center">$</span>
                  </div>
                  <h3 className="font-semibold text-tpb-dark">Monthly Net</h3>
                </div>
                <div className="text-4xl font-bold text-tpb-orange mb-2">
                  ${result.monthlyNet.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">after all costs</div>
              </div>

              {/* Year-1 ROI */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-l-4 border-tpb-slate">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-tpb-slate rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm flex items-center justify-center">%</span>
                  </div>
                  <h3 className="font-semibold text-tpb-dark">Year-1 ROI</h3>
                </div>
                <div className="text-4xl font-bold text-tpb-slate mb-2">
                  {result.year1Roi ? `${(result.year1Roi * 100).toFixed(0)}%` : "N/A"}
                </div>
                <div className="text-sm text-gray-600">return on investment</div>
              </div>

              {/* 3-Year Total */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-tpb-green">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-tpb-green rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm flex items-center justify-center">3Y</span>
                  </div>
                  <h3 className="font-semibold text-tpb-dark">3-Year Total</h3>
                </div>
                <div className="text-4xl font-bold text-tpb-green mb-2">
                  ${result.cumulative3Year.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">cumulative profit</div>
              </div>
            </div>

            {/* Package Contents - PNG Export */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-tpb-dark mb-4">Package Contents</h3>
              <div>
                <h4 className="font-medium text-tpb-dark mb-3">What's Included in Your {result.pkg} Package:</h4>
                <div className="space-y-2">
                  {(() => {
                    const selectedPackage = packages.find(p => p.key === result.pkg);
                    return selectedPackage ? selectedPackage.includes.split(', ').map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-tpb-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item.trim()}</span>
                      </div>
                    )) : "Package details not available";
                  })()}
                </div>
              </div>
            </div>

            {/* Mini Chart Section */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-tpb-dark mb-4">Monthly Profit Growth</h3>
              <div className="flex items-end space-x-2 h-24">
                {/* Simple bar chart representation */}
                <div className="flex-1 bg-tpb-green/20 rounded-t" style={{ height: '40%' }}>
                  <div className="text-xs text-center text-gray-600 mt-1">Month 1</div>
                </div>
                <div className="flex-1 bg-tpb-green/40 rounded-t" style={{ height: '60%' }}>
                  <div className="text-xs text-center text-gray-600 mt-1">Month 6</div>
                </div>
                <div className="flex-1 bg-tpb-green/60 rounded-t" style={{ height: '80%' }}>
                  <div className="text-xs text-center text-gray-600 mt-1">Month 12</div>
                </div>
                <div className="flex-1 bg-tpb-green rounded-t" style={{ height: '100%' }}>
                  <div className="text-xs text-center text-gray-600 mt-1">Month 24</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2 text-center">
                Steady monthly profit of ${result.monthlyNet.toLocaleString()} after payback
              </div>
            </div>

            {/* Key Benefits Summary */}
            <div className="bg-white border border-gray-200 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-bold text-tpb-dark mb-4 text-center">Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Fast Payback:</strong> Investment recovers in {result.paybackMonths?.toFixed(1) || "N/A"} months
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Monthly Impact:</strong> ${result.monthlyNet.toLocaleString()} net profit increase
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Long-term Value:</strong> {result.cumulative3YearRoi ? `${(result.cumulative3YearRoi * 100).toFixed(0)}%` : "N/A"} 3-year ROI
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="mb-8">
              <h4 className="font-semibold text-tpb-dark mb-4">Package Details</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-tpb-dark mb-2">Investment Summary</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package:</span>
                      <span className="font-semibold">{inputs.pkgKey}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Revenue:</span>
                      <span className="font-semibold">${inputs.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Uplift Projection:</span>
                      <span className="font-semibold">{inputs.upliftPct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Margin:</span>
                      <span className="font-semibold">{inputs.marginPct}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-tpb-dark mb-2">Package Includes</h5>
                  <div className="text-sm text-gray-600">
                    {(() => {
                      const selectedPackage = packages.find(p => p.key === inputs.pkgKey);
                      return selectedPackage ? selectedPackage.includes : "Package details not available";
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 border-t pt-4">
              <div className="mb-2">
                <strong>The Peak Beyond Interactive Kiosk Solutions</strong>
              </div>
              <div className="space-x-4">
                <span>www.thepeakbeyond.com</span>
                <span>415 579 1609</span>
                <span>info@thepeakbeyond.com</span>
              </div>
              <div className="mt-2">
                Generated on {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Smart Sections - Middle Ground */}
        <div className="space-y-6 mb-12">
          {/* What This Means */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-tpb-dark mb-4">What This Means</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">
                    <strong>Monthly Impact:</strong> Your ${result.monthlyNet.toLocaleString()} monthly net increase provides the opportunity to reduce staffing costs or invest in operational improvements.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">
                    <strong>Quick Payback:</strong> At {result.paybackMonths?.toFixed(1) || "N/A"} months, this is one of the fastest ROI investments available in retail.
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-slate rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">
                    <strong>Year-1 Performance:</strong> Your {result.year1Roi ? `${(result.year1Roi * 100).toFixed(0)}%` : "N/A"} ROI in year one significantly outperforms typical retail investments.
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-tpb-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">
                    <strong>Long-term Value:</strong> After payback, you'll have ${result.year3PlusMonthly.toLocaleString()} in pure monthly profit with no additional CapEx.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-tpb-dark mb-4">Next Steps</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-tpb-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-tpb-dark mb-2">Schedule Demo</h4>
                <p className="text-sm text-gray-600">See the kiosks in action and discuss your specific store layout and needs.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tpb-orange rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-tpb-dark mb-2">Confirm Package</h4>
                <p className="text-sm text-gray-600">Confirm package selection with layout consultation to optimize placement and performance.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tpb-slate rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-tpb-dark mb-2">Installation</h4>
                <p className="text-sm text-gray-600">Lead time is 4-8 weeks including training and plug n play install.</p>
              </div>
            </div>
          </div>

          {/* Multi-Location Option */}
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setShowMultiLocation(!showMultiLocation)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div>
                <h3 className="text-lg font-semibold text-tpb-dark">Multi-Location Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Calculate ROI for multiple stores with the same package configuration</p>
              </div>
              <span className="text-tpb-green">
                {showMultiLocation ? "Hide Multi-Location" : "Show Multi-Location"}
              </span>
            </button>
            
            {showMultiLocation && (
              <div className="px-6 pb-6 border-t">
                <MultiLocationROI />
              </div>
            )}
          </div>
        </div>

        {/* Start Over Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <button
            onClick={() => {
              console.log('Start Over button clicked');
              window.location.href = '/calculator';
            }}
            className="btn btn-secondary text-lg px-8 py-3"
            type="button"
          >
            Start Over
          </button>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-tpb-dark mb-4">
            Ready to Move Forward?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Book a personalized demo to see how The Peak Beyond can transform your retail space.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/XztRVFqNLygX9FKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-lg px-8 py-3"
            >
              Schedule a demo
            </a>
            <button
              onClick={handlePNGExport}
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Download ROI report (PNG)
            </button>
            <button
              onClick={() => {
                const shareText = `ROI Analysis: ${inputs.pkgKey} package pays for itself in ${result.paybackMonths?.toFixed(1) || "N/A"} months, generating $${result.monthlyNet.toLocaleString()} monthly net profit. Calculate your own: ${window.location.origin}/calculator`;
                navigator.clipboard.writeText(shareText);
                alert("Results copied to clipboard!");
              }}
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Share results
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-tpb-orange">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> Estimates are based on your inputs and industry benchmarks. 
            Actual results may vary by store size, product mix, and customer adoption.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 The Peak Beyond. Interactive kiosk solutions for retail.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

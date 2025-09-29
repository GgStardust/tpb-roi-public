import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useROICalculations } from '../hooks/useROICalculations';
import ROICalculator from '../components/ROICalculator';
import TPBHeader from '../components/TPBHeader';

export default function CalculatorPage() {
  const router = useRouter();
  const { inputs, packages, updateInput } = useROICalculations();
  const [showResults, setShowResults] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleBackToIntro = () => {
    router.push('/intro');
  };

  const handleViewAllFeatures = () => {
    router.push('/roi-tool');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TPBHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToIntro}
              className="text-tpb-green hover:text-tpb-dark flex items-center"
            >
              ← Back to Intro
            </button>
            <div className="text-sm text-gray-500">
              Step 1 of 2: Enter Your Store Details
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-tpb-green h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Top Section - Store Details and Inputs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Store Details + Package Selection - Upper Left */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-tpb-dark mb-2">
                Your Store Details
              </h1>
              <p className="text-gray-600">
                Enter your current store metrics to calculate the potential impact of interactive kiosks.
              </p>
            </div>

            {/* Package Selection Cards */}
            <div className="mb-6">
              <h3 className="font-semibold text-tpb-dark mb-4">Choose Your Package:</h3>
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.key}
                    onClick={() => updateInput('pkgKey', pkg.key)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 relative ${
                      inputs.pkgKey === pkg.key
                        ? 'border-tpb-green bg-green-50'
                        : 'border-gray-200 bg-white hover:border-tpb-green/50'
                    }`}
                  >
                    {pkg.key === 'Medium' && (
                      <div className="absolute -top-2 -right-2 bg-tpb-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Most popular
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-tpb-dark text-lg mb-2">{pkg.key}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          {pkg.includes.split(', ').map((item, index) => (
                            <div key={index}>{item.trim()}</div>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {pkg.key === 'Small' && 'Built for single-store testing and seasonal displays.'}
                          {pkg.key === 'Medium' && 'Balanced footprint for education and upsell, typical payback near two months.'}
                          {pkg.key === 'Large' && 'Higher capacity for busy stores and broad menus.'}
                          {pkg.key === 'High Flower' && 'Optimized for flower discovery with faster shopper flow.'}
                          {pkg.key === 'Franchise Model 20+ stores' && 'Multi-location pricing for repeatable rollouts.'}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-semibold text-gray-700">
                          ${pkg.capex.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          + ${pkg.monthly}/mo
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Input Section - Upper Right */}
          <div className="space-y-6">
            <ROICalculator
              inputs={inputs}
              packages={packages}
              onInputChange={updateInput}
              mode="calculator"
            />

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-tpb-dark mb-2">💡 Industry Insight</h3>
              <p className="text-sm text-gray-600 mb-3">
                The 12% uplift benchmark is based on published research in retail kiosks and on consumer user behavior data collected in store. In general retail, interactive kiosks often drive 10% to 15% gains in basket size or conversion. In cannabis, in-store media and kiosks have produced lifts up to 25% to 30% on featured items because the store is a primary engagement channel. Our analysis of observed sessions and baskets supports 12% as a practical average. Stores can expect conservative outcomes in the 5% to 8% range and optimistic outcomes in the 15% to 20%+ range depending on execution.
              </p>
              <button
                onClick={() => setShowLearnMore(true)}
                className="text-sm text-tpb-green hover:text-tpb-dark underline"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Preview */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-tpb-dark mb-2">
              Quick Preview
            </h2>
            <p className="text-gray-600">
              See a snapshot of your potential ROI before running the full calculation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Package:</span>
                <span className="font-semibold">{inputs.pkgKey}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Revenue:</span>
                <span className="font-semibold">${inputs.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Uplift:</span>
                <span className="font-semibold text-tpb-green">{inputs.upliftPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gross Margin:</span>
                <span className="font-semibold">{inputs.marginPct}%</span>
              </div>
              
              {/* Calculated Values */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Incremental monthly gross profit:</span>
                  <span className="font-semibold text-tpb-green">
                    ${((inputs.revenue * inputs.upliftPct / 100) * inputs.marginPct / 100).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated payback period:</span>
                  <span className="font-semibold text-tpb-orange">
                    {result.paybackMonths?.toFixed(1) || "N/A"} months
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <button
                onClick={() => router.push(`/results?${new URLSearchParams({
                  pkg: inputs.pkgKey,
                  revenue: inputs.revenue.toString(),
                  uplift: inputs.upliftPct.toString(),
                  margin: inputs.marginPct.toString(),
                  extraCapex: inputs.extraCapex.toString()
                })}`)}
                className="w-full btn btn-primary text-lg py-3"
              >
                Calculate My ROI
              </button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-tpb-dark mb-2">What Happens Next?</h3>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>• Detailed ROI calculations and projections</li>
              <li>• Payback period analysis</li>
              <li>• Multi-year profit projections</li>
              <li>• Downloadable reports for stakeholders</li>
            </ul>
            <button
              onClick={handleViewAllFeatures}
              className="text-sm text-tpb-green hover:text-tpb-dark underline"
            >
              Compare All Packages →
            </button>
          </div>
        </div>

      </div>

      {/* Learn More Modal */}
      {showLearnMore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-tpb-dark">What informs the 12% benchmark</h3>
                <button
                  onClick={() => setShowLearnMore(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <ul className="space-y-2">
                  <li>• Cross-industry kiosk studies that report 10% to 15% lift in conversion or average order value.</li>
                  <li>• Cannabis retail use of digital signage and kiosks that shows strong lift on promoted SKUs.</li>
                  <li>• In-store behavior data: session engagement, assisted discovery, and add-on rate observed across deployments.</li>
                  <li>• Adjustment for execution quality, store layout, content cadence, and staff enablement.</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  (Include footnote links to your chosen sources and a short line on your internal dataset. No numbers that reveal client identities.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useROICalculations } from '../hooks/useROICalculations';
import ROICalculator from '../components/ROICalculator';
import TPBHeader from '../components/TPBHeader';

export default function CalculatorPage() {
  const router = useRouter();
  const { inputs, packages, updateInput } = useROICalculations();
  const [showResults, setShowResults] = useState(false);

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.key}
                    onClick={() => updateInput('pkgKey', pkg.key)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      inputs.pkgKey === pkg.key
                        ? 'border-tpb-green bg-green-50'
                        : 'border-gray-200 bg-white hover:border-tpb-green/50'
                    }`}
                  >
                    <h4 className="font-bold text-tpb-dark text-lg mb-2">{pkg.key}</h4>
                    <div className="text-sm font-semibold text-gray-700 mb-3">
                      ${pkg.capex.toLocaleString()} + ${pkg.monthly}/mo
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {pkg.includes.split(', ').map((item, index) => (
                        <div key={index}>{item.trim()}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ROICalculator
              inputs={inputs}
              packages={packages}
              onInputChange={updateInput}
              mode="calculator"
            />

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-tpb-dark mb-2">💡 Industry Insight</h3>
              <p className="text-sm text-gray-600">
                <strong>12% is the industry average</strong> for interactive display uplift in cannabis retail. 
                This is based on data from 200+ store implementations. You can adjust this lever to see 
                conservative (5-8%) or optimistic (15-20%) scenarios based on your store's unique factors.
              </p>
            </div>
          </div>

          {/* Preview Section */}
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

      </div>
    </div>
  );
}

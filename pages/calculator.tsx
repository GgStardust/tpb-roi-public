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

            <ROICalculator
              inputs={inputs}
              packages={packages}
              onInputChange={updateInput}
              mode="calculator"
            />

            {/* Package Descriptions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-tpb-dark mb-3">Package Details:</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {packages.map((pkg) => (
                  <div key={pkg.key} className="flex justify-between">
                    <span className="font-medium">{pkg.key}:</span>
                    <span>{pkg.includes}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-tpb-dark mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-gray-600">
                Start with conservative estimates (5-8% uplift) for a realistic baseline. 
                You can always adjust to see optimistic scenarios (15-20% uplift) after viewing initial results.
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

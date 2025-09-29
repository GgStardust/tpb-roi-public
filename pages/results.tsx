import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useROICalculations } from '../hooks/useROICalculations';
import ROIResults from '../components/ROIResults';
import ROIVisualization from '../components/ROIVisualization';
import MultiLocationROI from '../components/MultiLocationROI';
import TPBHeader from '../components/TPBHeader';
import { generateROISnapshot } from '../utils/roiCalculations';

export default function ResultsPage() {
  const router = useRouter();
  const { inputs, result, updateInput, packages } = useROICalculations();
  const [showDetails, setShowDetails] = useState(false);
  const [showMultiLocation, setShowMultiLocation] = useState(false);

  // Handle PNG export
  const handlePNGExport = () => {
    const element = document.getElementById('roi-results');
    if (element) {
      import('html2canvas').then(html2canvas => {
        html2canvas.default(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = `TPB-ROI-${result.pkg}-${new Date().toISOString().split('T')[0]}.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
      });
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
            <button
              onClick={handleBackToCalculator}
              className="text-tpb-green hover:text-tpb-dark flex items-center"
            >
              ← Back to Calculator
            </button>
            <div className="text-sm text-gray-500">
              Step 2 of 2: Your ROI Results
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

        {/* Key Metrics Dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Detailed Results - Collapsible */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <h2 className="text-xl font-bold text-tpb-dark">
                Detailed Analysis
              </h2>
              <span className="text-tpb-green">
                {showDetails ? "Hide Details" : "Show Details"}
              </span>
            </button>
            
            {showDetails && (
              <div className="px-6 pb-6 border-t">
                <div id="roi-results">
                  <ROIResults
                    result={result}
                    revenue={inputs.revenue}
                    upliftPct={inputs.upliftPct}
                    marginPct={inputs.marginPct}
                    inputs={inputs}
                    showExport={true}
                    canExportPNG={true}
                    canExportSnapshot={true}
                    onSnapshotExport={handleSnapshotExport}
                    onPNGExport={handlePNGExport}
                    className="mb-8"
                  />
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-tpb-dark mb-4">
                    Annual Profit Projection
                  </h3>
                  <ROIVisualization
                    result={result}
                    campaignTitle="Your Store Analysis"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Multi-Location Calculator - Collapsible */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setShowMultiLocation(!showMultiLocation)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <h2 className="text-xl font-bold text-tpb-dark">
                Multi-Location Analysis
              </h2>
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

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-tpb-dark mb-4">
            Ready to Move Forward?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your ROI analysis shows strong potential. Schedule a demo to discuss 
            implementation and see how interactive kiosks can transform your store.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/XztRVFqNLygX9FKFA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-lg px-8 py-3"
            >
              Schedule Demo
            </a>
            <button
              onClick={handleStartOver}
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Calculate Another Scenario
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

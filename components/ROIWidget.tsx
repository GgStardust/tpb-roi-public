import React from "react";
import { useROICalculations, type UseROICalculationsOptions } from "../hooks/useROICalculations";
import { generateROISnapshot, type CampaignDefaults } from "../utils/roiCalculations";
import ROICalculator from "./ROICalculator";
import ROIResults from "./ROIResults";
import ROIVisualization from "./ROIVisualization";

export type ROIMode = 'campaign' | 'calculator' | 'widget';

export interface ROIWidgetProps {
  mode: ROIMode;
  campaignDefaults?: CampaignDefaults;
  showInputs?: boolean;
  showExport?: boolean;
  showCampaignContext?: boolean;
  className?: string;
}

export default function ROIWidget({
  mode,
  campaignDefaults,
  showInputs = true,
  showExport = true,
  showCampaignContext = false,
  className = ""
}: ROIWidgetProps) {
  // Simplified version without campaign context
  const { inputs, result, updateInput, packages } = useROICalculations({
    campaignDefaults
  });

  // Determine export configuration based on mode
  const exportConfig = {
    campaign: { png: true, snapshot: true, showContext: true },
    calculator: { png: true, snapshot: true, showContext: false },
    widget: { png: false, snapshot: true, showContext: false }
  };

  const canExportPNG = showExport && (exportConfig[mode].png || mode === 'widget');
  const canExportSnapshot = showExport && exportConfig[mode].snapshot;
  const shouldShowContext = showCampaignContext && exportConfig[mode].showContext;

  // Generate campaign title for exports
  const campaignTitle = undefined; // No campaign context in standalone

  // Generate snapshot for clipboard export
  const handleSnapshotExport = () => {
    const snapshot = generateROISnapshot(inputs, result, campaignTitle);
    navigator.clipboard.writeText(snapshot);
    alert("ROI Snapshot copied to clipboard!");
  };

  // Generate PNG export
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

  return (
    <div className={`grid lg:grid-cols-2 gap-6 ${className}`}>
      {/* Campaign Context Banner - Not used in standalone */}
      {shouldShowContext && (
        <div className="card p-4 bg-blue-50 border-blue-200 lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="pill bg-blue-600">Active Campaign</span>
            <span className="font-medium">Standalone Mode</span>
          </div>
          <div className="text-sm text-gray-600">
            Standalone ROI Calculator
          </div>
        </div>
      )}

      {/* Input Form */}
      {showInputs && (
        <ROICalculator
          inputs={inputs}
          packages={packages}
          onInputChange={updateInput}
          mode={mode}
        />
      )}

      {/* Results Display */}
      <div id="roi-results">
        <ROIResults
          result={result}
          revenue={inputs.revenue}
          upliftPct={inputs.upliftPct}
          marginPct={inputs.marginPct}
          inputs={inputs}
          showExport={showExport}
          canExportPNG={canExportPNG}
          canExportSnapshot={canExportSnapshot}
          onSnapshotExport={handleSnapshotExport}
          onPNGExport={handlePNGExport}
          campaignTitle={campaignTitle}
        />
      </div>

      {/* Additional Visualization for Calculator Mode - Full Width Below */}
      {mode === 'calculator' && (
        <div className="lg:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-tpb-dark mb-4">
            Annual Profit Projection
          </h3>
          <ROIVisualization 
            result={result} 
            campaignTitle={campaignTitle}
          />
        </div>
      )}
    </div>
  );
}
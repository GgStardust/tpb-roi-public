import React from "react";
import { useROICalculations, type UseROICalculationsOptions } from "../hooks/useROICalculations";
import { generateROISnapshot, type CampaignDefaults } from "../utils/roiCalculations";
import ROICalculator from "./ROICalculator";
import ROIResults from "./ROIResults";

export interface ROIWidgetStandaloneProps {
  campaignDefaults?: CampaignDefaults;
  showInputs?: boolean;
  showExport?: boolean;
  className?: string;
}

export default function ROIWidgetStandalone({
  campaignDefaults,
  showInputs = true,
  showExport = true,
  className = ""
}: ROIWidgetStandaloneProps) {
  const options: UseROICalculationsOptions = {
    campaignDefaults,
  };

  const { inputs, result, updateInput, packages } = useROICalculations(options);

  // Generate snapshot for clipboard export
  const handleSnapshotExport = () => {
    const snapshot = generateROISnapshot(inputs, result);
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
      {/* Input Form */}
      {showInputs && (
        <ROICalculator
          inputs={inputs}
          packages={packages}
          onInputChange={updateInput}
          mode="widget"
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
          canExportPNG={true}
          canExportSnapshot={true}
          onSnapshotExport={handleSnapshotExport}
          onPNGExport={handlePNGExport}
          className=""
        />
      </div>
    </div>
  );
}

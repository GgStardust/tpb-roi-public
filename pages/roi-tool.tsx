import React from "react";
import ROIWidgetStandalone from "../components/ROIWidgetStandalone";
import MultiLocationROI from "../components/MultiLocationROI";
import TPBHeader from "../components/TPBHeader";

export default function ROIToolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <TPBHeader />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ROIWidgetStandalone
            showInputs={true}
            showExport={true}
          />
          
          {/* Multi-Location ROI Calculator */}
          <div className="mt-12">
            <MultiLocationROI />
          </div>
          
          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-tpb-orange">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> Estimates are based on your inputs and industry benchmarks. Actual results may vary by store size, product mix, and customer adoption.
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

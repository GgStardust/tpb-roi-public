import React from "react";
import ROIWidgetStandalone from "../components/ROIWidgetStandalone";

export default function EmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ROIWidgetStandalone
        showInputs={true}
        showExport={true}
      />
    </div>
  );
}

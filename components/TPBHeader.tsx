import React from "react";
import TPBLogoTransparent from "./TPBLogoTransparent";

interface TPBHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export default function TPBHeader({ 
  title = "The Peak Beyond ROI Calculator",
  subtitle = "Calculate the return on investment for interactive kiosk solutions",
  showLogo = true,
  className = ""
}: TPBHeaderProps) {
  return (
    <div className={`bg-white shadow-sm border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-tpb-dark">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-tpb-slate">
              <div className="font-semibold text-tpb-dark">www.thepeakbeyond.com</div>
              <div>415 579 1609</div>
              <div>info@thepeakbeyond.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

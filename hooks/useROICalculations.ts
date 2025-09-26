import { useState, useMemo, useEffect } from "react";
import { calculateROI, getPackages, type ROIInputs, type ROIResult, type CampaignDefaults } from "../utils/roiCalculations";

export interface UseROICalculationsOptions {
  campaignDefaults?: CampaignDefaults;
  initialInputs?: Partial<ROIInputs>;
}

export function useROICalculations(options: UseROICalculationsOptions = {}) {
  const { campaignDefaults, initialInputs } = options;
  
  // Initialize state with defaults or campaign values
  const [inputs, setInputs] = useState<ROIInputs>(() => ({
    pkgKey: campaignDefaults?.package || initialInputs?.pkgKey || "Medium",
    extraCapex: initialInputs?.extraCapex || 0,
    revenue: campaignDefaults?.revenue || initialInputs?.revenue || 120000,
    upliftPct: campaignDefaults?.upliftPct || initialInputs?.upliftPct || 12,
    marginPct: campaignDefaults?.marginPct || initialInputs?.marginPct || 50,
  }));

  // Auto-fill from campaign defaults when they change
  useEffect(() => {
    if (campaignDefaults) {
      setInputs(prev => ({
        ...prev,
        revenue: campaignDefaults.revenue,
        upliftPct: campaignDefaults.upliftPct,
        marginPct: campaignDefaults.marginPct,
        pkgKey: campaignDefaults.package,
      }));
    }
  }, [campaignDefaults]);

  // Calculate ROI result whenever inputs change
  const result = useMemo(() => {
    return calculateROI(inputs);
  }, [inputs]);

  // Update individual input values
  const updateInput = (key: keyof ROIInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Update multiple inputs at once
  const updateInputs = (updates: Partial<ROIInputs>) => {
    setInputs(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Reset to campaign defaults or initial values
  const resetToDefaults = () => {
    if (campaignDefaults) {
      setInputs({
        pkgKey: campaignDefaults.package,
        extraCapex: 0,
        revenue: campaignDefaults.revenue,
        upliftPct: campaignDefaults.upliftPct,
        marginPct: campaignDefaults.marginPct,
      });
    } else if (initialInputs) {
      setInputs({
        pkgKey: initialInputs.pkgKey || "Medium",
        extraCapex: initialInputs.extraCapex || 0,
        revenue: initialInputs.revenue || 120000,
        upliftPct: initialInputs.upliftPct || 4,
        marginPct: initialInputs.marginPct || 50,
      });
    }
  };

  return {
    inputs,
    result,
    updateInput,
    updateInputs,
    resetToDefaults,
    packages: getPackages(),
  };
}

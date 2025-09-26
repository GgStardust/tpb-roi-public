import React, { useState } from "react";
import { calculateROI, type ROIInputs, type ROIResult } from "../utils/roiCalculations";

interface MultiLocationROIProps {
  className?: string;
}

export default function MultiLocationROI({ className = "" }: MultiLocationROIProps) {
  const [franchiseInputs, setFranchiseInputs] = useState<ROIInputs>({
    pkgKey: "Franchise Model 20+ stores",
    extraCapex: 0,
    revenue: 120000,
    upliftPct: 12, // Default to 12% average uplift
    marginPct: 50
  });
  
  const [numberOfStores, setNumberOfStores] = useState(1);

  const updateFranchiseInputs = (field: keyof ROIInputs, value: any) => {
    setFranchiseInputs({ ...franchiseInputs, [field]: value });
  };

  // Calculate single store ROI
  const singleStoreResult = calculateROI(franchiseInputs);
  
  // Calculate franchise totals
  const totalCapEx = singleStoreResult.capex * numberOfStores;
  const totalMonthlyFees = singleStoreResult.monthlyFees * numberOfStores;
  const totalMonthlyNet = singleStoreResult.monthlyNet * numberOfStores;
  const totalYear1Net = singleStoreResult.year1Net * numberOfStores;
  const totalYear2Net = singleStoreResult.year2Net * numberOfStores;
  const totalCumulative3Year = singleStoreResult.cumulative3Year * numberOfStores;
  
  const overallPaybackMonths = totalMonthlyNet > 0 ? totalCapEx / totalMonthlyNet : null;
  const overallYear1ROI = (totalCapEx + totalMonthlyFees * 12) > 0 ? totalYear1Net / (totalCapEx + totalMonthlyFees * 12) : null;
  const overall3YearROI = (totalCapEx + totalMonthlyFees * 36) > 0 ? totalCumulative3Year / (totalCapEx + totalMonthlyFees * 36) : null;

  return (
    <div className={`card p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-tpb-dark mb-4">Franchise Multi-Location ROI</h3>
        <p className="text-sm text-gray-600 mb-4">
          Calculate ROI for multiple stores using the same package configuration
        </p>
      </div>

      {/* Franchise Setup */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-tpb-dark mb-4">Franchise Configuration</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="label">Package</label>
            <select
              value={franchiseInputs.pkgKey}
              onChange={(e) => updateFranchiseInputs('pkgKey', e.target.value)}
              className="input"
            >
              <option value="Franchise Model 20+ stores">Franchise Model 20+ stores</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="High Flower">High Flower</option>
            </select>
          </div>
          
          <div>
            <label className="label">Monthly Revenue per Store</label>
            <input
              type="number"
              value={franchiseInputs.revenue}
              onChange={(e) => updateFranchiseInputs('revenue', Number(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="label">Uplift %</label>
            <input
              type="number"
              step="0.1"
              value={franchiseInputs.upliftPct}
              onChange={(e) => updateFranchiseInputs('upliftPct', Number(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="label">Margin %</label>
            <input
              type="number"
              step="0.1"
              value={franchiseInputs.marginPct}
              onChange={(e) => updateFranchiseInputs('marginPct', Number(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="label">Number of Stores</label>
            <input
              type="number"
              min="1"
              max="100"
              value={numberOfStores}
              onChange={(e) => setNumberOfStores(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Single Store Preview */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-tpb-dark mb-3">Per Store Performance</h4>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-tpb-slate">CapEx per Store:</span>
            <span className="font-semibold ml-2">${singleStoreResult.capex.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-tpb-slate">Monthly Net per Store:</span>
            <span className="font-semibold ml-2 text-tpb-green">${singleStoreResult.monthlyNet.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-tpb-slate">Payback per Store:</span>
            <span className="font-semibold ml-2 text-tpb-green">
              {singleStoreResult.paybackMonths?.toFixed(1) || "N/A"} months
            </span>
          </div>
          <div>
            <span className="text-tpb-slate">Year-1 ROI per Store:</span>
            <span className="font-semibold ml-2 text-tpb-green">
              {singleStoreResult.year1Roi ? `${(singleStoreResult.year1Roi * 100).toFixed(1)}%` : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Franchise Totals */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-tpb-dark mb-4">
          Franchise Total ({numberOfStores} Store{numberOfStores > 1 ? 's' : ''})
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Total CapEx</p>
            <p className="text-2xl font-bold text-tpb-dark">${totalCapEx.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">${singleStoreResult.capex.toLocaleString()} × {numberOfStores}</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Total Monthly Net</p>
            <p className="text-2xl font-bold text-tpb-green">${totalMonthlyNet.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">${singleStoreResult.monthlyNet.toLocaleString()} × {numberOfStores}</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Overall Payback</p>
            <p className="text-2xl font-bold text-tpb-green">
              {overallPaybackMonths?.toFixed(1) || "N/A"} months
            </p>
            <p className="text-sm text-gray-600 mt-1">Same as single store</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Overall Year-1 ROI</p>
            <p className="text-2xl font-bold text-tpb-green">
              {overallYear1ROI ? `${(overallYear1ROI * 100).toFixed(1)}%` : "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-1">Same as single store</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Total Year-1 Net</p>
            <p className="text-xl font-bold text-tpb-green">${totalYear1Net.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">${singleStoreResult.year1Net.toLocaleString()} × {numberOfStores}</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Total Year-2 Net</p>
            <p className="text-xl font-bold text-tpb-green">${totalYear2Net.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">${singleStoreResult.year2Net.toLocaleString()} × {numberOfStores}</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">3-Year Cumulative</p>
            <p className="text-xl font-bold text-tpb-green">${totalCumulative3Year.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">${singleStoreResult.cumulative3Year.toLocaleString()} × {numberOfStores}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
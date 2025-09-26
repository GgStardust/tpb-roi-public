import React from "react";
import { type ROIInputs, type Pkg } from "../utils/roiCalculations";

interface ROICalculatorProps {
  inputs: ROIInputs;
  packages: Pkg[];
  onInputChange: (key: keyof ROIInputs, value: any) => void;
  mode: 'campaign' | 'calculator' | 'widget';
  className?: string;
}

export default function ROICalculator({ 
  inputs, 
  packages, 
  onInputChange, 
  mode,
  className = "" 
}: ROICalculatorProps) {
  
  return (
    <div className={`card p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-tpb-dark">INPUTS</h3>

      <label className="label">Package</label>
      <select 
        value={inputs.pkgKey} 
        onChange={e => onInputChange('pkgKey', e.target.value)} 
        className="input mb-4"
      >
        {packages.map(p => (
          <option key={p.key} value={p.key}>{p.key}</option>
        ))}
      </select>

      <label className="label">Extra CapEx (millwork/custom)</label>
      <input 
        type="number" 
        className="input mb-4" 
        value={inputs.extraCapex} 
        onChange={e => onInputChange('extraCapex', Number(e.target.value))} 
        placeholder="0" 
      />

      <label className="label">Monthly Revenue Target (R)</label>
      <input 
        type="number" 
        className="input mb-4" 
        value={inputs.revenue} 
        onChange={e => onInputChange('revenue', Number(e.target.value))} 
        placeholder="120000" 
      />

      <label className="label">Uplift % (U)</label>
      
      <input
        type="range"
        min={0}
        max={30}
        step={1}
        value={inputs.upliftPct}
        onChange={(e) => onInputChange('upliftPct', +e.target.value)}
        className="w-full mb-2"
      />
      <div className="flex gap-2 mt-2 mb-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onInputChange('upliftPct', 5)}
        >
          Conservative (5%)
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onInputChange('upliftPct', 12)}
        >
          Average (12%)
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onInputChange('upliftPct', 30)}
        >
          Optimistic (30%)
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Current uplift: {inputs.upliftPct}%</p>
      
      <input 
        type="number" 
        step="0.1" 
        className="input mb-4" 
        value={inputs.upliftPct} 
        onChange={e => onInputChange('upliftPct', Number(e.target.value))} 
        placeholder="4" 
      />

      <label className="label">Gross Margin % (G)</label>
      <input 
        type="number" 
        step="0.1" 
        className="input mb-6" 
        value={inputs.marginPct} 
        onChange={e => onInputChange('marginPct', Number(e.target.value))} 
        placeholder="50" 
      />

      <p className="text-xs text-gray-500">Guidance: Uplift 2–5%, default GM 50%.</p>
    </div>
  );
}

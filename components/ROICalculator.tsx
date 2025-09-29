import React from "react";
import { type ROIInputs, type Pkg } from "../utils/roiCalculations";
import { formatCurrency } from "../utils/formatting";

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
  
  const upliftPresets = [
    { value: 5, label: 'Conservative (5%)', description: 'Safe case for new teams or light content rotation.' },
    { value: 12, label: 'Average (12%)', description: 'Typical case from research and in-store behavior.' },
    { value: 30, label: 'Optimistic (30%)', description: 'Growth case with strong execution and high engagement.' }
  ];

  return (
    <div className={`card p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-tpb-dark">INPUTS</h3>

      <div className="space-y-6">
        <div>
          <label className="label">Monthly Revenue Target</label>
          <input 
            type="number" 
            className="input mb-2" 
            value={inputs.revenue} 
            onChange={e => onInputChange('revenue', Number(e.target.value))} 
            placeholder="120000" 
          />
          <p className="text-xs text-gray-500">Enter your store's average monthly sales.</p>
        </div>

        <div>
          <label className="label">Uplift %</label>
          <p className="text-xs text-gray-500 mb-3">Most stores see 8% to 15% based on in-store behavior data. Use the presets to test scenarios.</p>
          
          {/* Uplift Presets as Radio Cards */}
          <div className="space-y-2 mb-4">
            {upliftPresets.map((preset) => (
              <div
                key={preset.value}
                onClick={() => onInputChange('upliftPct', preset.value)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  inputs.upliftPct === preset.value
                    ? 'border-tpb-green bg-green-50'
                    : 'border-gray-200 bg-white hover:border-tpb-green/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{preset.label}</div>
                    <div className="text-xs text-gray-600">{preset.description}</div>
                  </div>
                  <input
                    type="radio"
                    checked={inputs.upliftPct === preset.value}
                    onChange={() => onInputChange('upliftPct', preset.value)}
                    className="text-tpb-green"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Slider and Manual Input */}
          <input
            type="range"
            min={0}
            max={30}
            step={0.1}
            value={inputs.upliftPct}
            onChange={(e) => onInputChange('upliftPct', +e.target.value)}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>0%</span>
            <span>30%</span>
          </div>
          
          <input 
            type="number" 
            step="0.1" 
            className="input" 
            value={inputs.upliftPct} 
            onChange={e => onInputChange('upliftPct', Number(e.target.value))} 
            placeholder="12" 
          />
        </div>

        <div>
          <label className="label">Gross Margin %</label>
          <input 
            type="number" 
            step="0.1" 
            className="input mb-2" 
            value={inputs.marginPct} 
            onChange={e => onInputChange('marginPct', Number(e.target.value))} 
            placeholder="50" 
          />
          <p className="text-xs text-gray-500">Use your blended gross margin. Default is 50%.</p>
        </div>

        <div>
          <label className="label">Extra CapEx</label>
          <input 
            type="number" 
            className="input mb-2" 
            value={inputs.extraCapex} 
            onChange={e => onInputChange('extraCapex', Number(e.target.value))} 
            placeholder="0" 
          />
          <p className="text-xs text-gray-500">Add millwork or custom build costs if applicable. Leave at 0 if none.</p>
        </div>
      </div>
    </div>
  );
}

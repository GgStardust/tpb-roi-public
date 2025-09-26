import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type ROIResult } from "../utils/roiCalculations";

const currency = (n: number) =>
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

interface ROIVisualizationProps {
  result: ROIResult;
  campaignTitle?: string;
}

export default function ROIVisualization({ result, campaignTitle }: ROIVisualizationProps) {
  const chartData = [
    {
      name: 'Baseline Profit',
      value: result.upliftMonthlyGrossProfit / (result.upliftMonthlyGrossProfit / result.monthlyFees) * 12, // Annual baseline
      fill: '#e5e7eb'
    },
    {
      name: 'Uplift Profit',
      value: result.upliftMonthlyGrossProfit * 12, // Annual uplift
      fill: '#10b981'
    },
    {
      name: 'Net After Fees',
      value: result.monthlyNet * 12, // Annual net
      fill: '#3b82f6'
    }
  ];

  const copyChartAsImage = async () => {
    // This would require additional implementation with html2canvas
    // For now, we'll copy the data as text
    const chartText = `ROI Scenario - ${campaignTitle || 'Campaign'}\n\n` +
      `Baseline Annual Profit: ${currency(chartData[0].value)}\n` +
      `Uplift Annual Profit: ${currency(chartData[1].value)}\n` +
      `Net After Fees: ${currency(chartData[2].value)}\n` +
      `Payback: ${result.paybackMonths ? result.paybackMonths.toFixed(1) : 'N/A'} months\n` +
      `Year-1 ROI: ${result.year1Roi ? (result.year1Roi * 100).toFixed(1) + '%' : 'N/A'}`;
    
    try {
      await navigator.clipboard.writeText(chartText);
      alert('ROI data copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="kicker">ROI Visualization</div>
        <button 
          onClick={copyChartAsImage}
          className="btn btn-secondary text-sm"
        >
          Copy ROI Snapshot
        </button>
      </div>
      
      <h3 className="text-lg font-semibold mb-4 text-tpb-dark">
        ROI Scenario – {campaignTitle || 'Campaign'}
      </h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: number) => [currency(value), 'Annual Value']}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-medium text-gray-600">Baseline</div>
          <div className="text-gray-900">{currency(chartData[0].value)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-600">Uplift</div>
          <div className="text-gray-900">{currency(chartData[1].value)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-600">Net After Fees</div>
          <div className="text-gray-900">{currency(chartData[2].value)}</div>
        </div>
      </div>
    </div>
  );
}

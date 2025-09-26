import React, { useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import packagesData from "../data/packages.json";
import html2canvas from "html2canvas";
import TPBFooterLogo from "./TPBFooterLogo";
import { calculateROI } from "../utils/roiCalculations";

const currency = (n: number) =>
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const percent = (n: number|null) =>
  n === null ? "N/A" : `${(n*100).toFixed(1)}%`;

const generateROIStory = (result: any, inputs: any, campaignTitle?: string) => {
  const paybackMonths = result.paybackMonths?.toFixed(1) || "N/A";
  const upliftPct = inputs.upliftPct;
  const packageName = result.pkg;
  
  // Determine operator type based on campaign context
  let operatorType = "operators";
  if (campaignTitle?.includes("MSO") || campaignTitle?.includes("Multi-State")) {
    operatorType = "MSOs";
  } else if (campaignTitle?.includes("Single Store")) {
    operatorType = "single-store operators";
  }
  
  // Determine state context
  let stateContext = "";
  if (campaignTitle?.includes("NY")) stateContext = " in New York";
  else if (campaignTitle?.includes("CA")) stateContext = " in California";
  else if (campaignTitle?.includes("Multi-State")) stateContext = " across multiple states";
  
  return `This ${packageName} package pays for itself in ${paybackMonths} months with ${upliftPct}% uplift — making it a quick win for ${operatorType}${stateContext}.`;
};

export default function ROIResults({
  result,
  revenue,
  upliftPct,
  marginPct,
  inputs,
  showExport = true,
  canExportPNG = true,
  canExportSnapshot = true,
  onSnapshotExport,
  onPNGExport,
  campaignTitle,
  className = ""
}: {
  result: {
    pkg: string;
    capex: number;
    monthlyFees: number;
    upliftMonthlyGrossProfit: number;
    monthlyNet: number;
    paybackMonths: number | null;
    year1Fees: number;
    year1Net: number;
    year1Roi: number | null;
    // Multi-year projections
    year2Net: number;
    year2Roi: number | null;
    year3PlusMonthly: number;
    cumulative3Year: number;
    cumulative3YearRoi: number | null;
  };
  revenue: number;
  upliftPct: number;
  marginPct: number;
  inputs: {
    pkgKey: string;
    extraCapex: number;
    revenue: number;
    upliftPct: number;
    marginPct: number;
  };
  showExport?: boolean;
  canExportPNG?: boolean;
  canExportSnapshot?: boolean;
  onSnapshotExport?: () => void;
  onPNGExport?: () => void;
  campaignTitle?: string;
  className?: string;
}) {
  const roiRef = useRef<HTMLDivElement>(null);
  const [showScenarios, setShowScenarios] = useState(false);
  
  // Get package details
  const pkg = (packagesData as any[]).find(p => p.key === result.pkg);
  
  // Calculate scenarios for different uplift percentages
  const scenarios = [
    { name: "Conservative", uplift: 10 },
    { name: "Average", uplift: 20 },
    { name: "Aggressive", uplift: 30 }
  ].map(scenario => {
    const scenarioInputs = { ...inputs, upliftPct: scenario.uplift };
    const scenarioResult = calculateROI(scenarioInputs);
    return {
      ...scenario,
      result: scenarioResult
    };
  });

  const rows: [string, string | number | React.ReactNode][] = [
    ["Package", (
      <div>
        <div className="font-semibold">{result.pkg}</div>
        {pkg?.includes && (
          <ul className="text-sm text-gray-600 list-disc ml-4 mt-1">
            {pkg.includes.split(",").map((item: string, idx: number) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        )}
      </div>
    )],
    ["CapEx", <span className="font-semibold text-right">{currency(result.capex)}</span>],
    ["Monthly Fees", <span className="font-semibold text-right">{currency(result.monthlyFees)}</span>],
    ["Monthly Gross Profit Uplift", <span className="font-semibold text-right">{currency(result.upliftMonthlyGrossProfit)}</span>],
    ["Monthly Net (after fees)", <span className="font-semibold text-right text-tpb-green">{currency(result.monthlyNet)}</span>],
    ["Payback Period", <span className="font-bold text-right text-tpb-green text-lg">{result.paybackMonths ? `${result.paybackMonths.toFixed(1)} months` : "N/A"}</span>],
    ["Year-1 Fees", <span className="font-semibold text-right">{currency(result.year1Fees)}</span>],
    ["Year-1 Net", <span className="font-semibold text-right text-tpb-green">{currency(result.year1Net)}</span>],
    ["Year-1 ROI", <span className="font-semibold text-right text-tpb-green">{percent(result.year1Roi)}</span>],
    ["Year-2 Net", <span className="font-semibold text-right text-tpb-green">{currency(result.year2Net)}</span>],
    ["Year-2 ROI", <span className="font-semibold text-right text-tpb-green">{percent(result.year2Roi)}</span>],
    ["Year-3+ Monthly", <span className="font-semibold text-right text-tpb-green">{currency(result.year3PlusMonthly)}</span>],
    ["3-Year Cumulative", <span className="font-semibold text-right text-tpb-green">{currency(result.cumulative3Year)}</span>],
    ["3-Year ROI", <span className="font-semibold text-right text-tpb-green">{percent(result.cumulative3YearRoi)}</span>],
  ];

  // Build chart data for Before vs After comparison
  const baselineProfit = revenue * (marginPct / 100);
  const newProfit = baselineProfit + result.upliftMonthlyGrossProfit - result.monthlyFees;

  const data = [
    { name: "Baseline", value: baselineProfit },
    { name: `With Kiosks (${upliftPct}%)`, value: newProfit }
  ];

  // Generate ROI Snapshot
  const snapshot = campaignTitle 
    ? `ROI Snapshot – ${result.pkg} Package (${campaignTitle})

Inputs:
- Monthly Revenue Target: $${revenue.toLocaleString()}
- Uplift: ${upliftPct}%
- Gross Margin: ${marginPct}%

Outputs:
- Baseline Monthly Profit: $${baselineProfit.toLocaleString()}
- New Monthly Profit (with kiosks): $${newProfit.toLocaleString()}
- Monthly Net Increase: $${result.monthlyNet.toLocaleString()}
- Payback Period: ${result.paybackMonths?.toFixed(1) ?? "N/A"} months
- Year-1 ROI: ${result.year1Roi ? `${(result.year1Roi * 100).toFixed(1)}%` : "N/A"}

Next Step: Book a 15-minute ROI demo: https://calendar.app.google/XztRVFqNLygX9FKFA`
    : `ROI Snapshot – ${result.pkg} Package

Inputs:
- Monthly Revenue Target: $${revenue.toLocaleString()}
- Uplift: ${upliftPct}%
- Gross Margin: ${marginPct}%

Outputs:
- Baseline Monthly Profit: $${baselineProfit.toLocaleString()}
- New Monthly Profit (with kiosks): $${newProfit.toLocaleString()}
- Monthly Net Increase: $${result.monthlyNet.toLocaleString()}
- Payback Period: ${result.paybackMonths?.toFixed(1) ?? "N/A"} months
- Year-1 ROI: ${result.year1Roi ? `${(result.year1Roi * 100).toFixed(1)}%` : "N/A"}

Next Step: Book a 15-minute ROI demo: https://calendar.app.google/XztRVFqNLygX9FKFA`;

  const exportPng = async () => {
    if (roiRef.current) {
      try {
        const canvas = await html2canvas(roiRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          width: roiRef.current.offsetWidth + 80, // Add extra width for padding
          height: roiRef.current.offsetHeight + 80, // Add extra height for padding
        });
        
        const link = document.createElement('a');
        link.download = `roi-${result.pkg.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error exporting PNG:', error);
        alert('Error exporting PNG. Please try again.');
      }
    }
  };

  return (
    <div className={`card p-6 ${className}`}>
      {/* ROI Content - This will be captured in PNG */}
      <div ref={roiRef} className="p-4 relative">
        <h3 className="text-lg font-semibold mb-4 text-tpb-dark">
          ROI Results – {result.pkg} Package
        </h3>
        
        {/* Inline Assumptions */}
        <p className="text-sm text-gray-600 mt-2 mb-4">
          Based on inputs: Revenue Target ${inputs.revenue.toLocaleString()}, Uplift {inputs.upliftPct}%, Margin {inputs.marginPct}%, CapEx ${inputs.extraCapex.toLocaleString()}.
        </p>
        
        {/* ROI Scenarios Toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showScenarios}
              onChange={(e) => setShowScenarios(e.target.checked)}
              className="rounded border-gray-300 text-tpb-green focus:ring-tpb-green"
            />
            <span className="text-sm font-medium text-tpb-slate">
              Show ROI Range (Conservative / Average / Aggressive)
            </span>
          </label>
        </div>
        
        {/* Disclaimer - Visible in both UI and PNG exports */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg border-l-4 border-tpb-orange">
          <p className="text-xs text-gray-600">
            <strong>Disclaimer:</strong> Estimates are based on your inputs and industry benchmarks. Actual results may vary by store size, product mix, and customer adoption.
          </p>
        </div>
        
        {/* Footer Logo Watermark - Only visible in PNG exports */}
        <TPBFooterLogo />
        
        <div className="overflow-auto mb-6">
          <table className="table">
            <tbody>
              {rows.map(([k,v], index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 font-medium text-tpb-slate">{k}</td>
                  <td className="py-3 text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* ROI Scenarios Table */}
        {showScenarios && (
          <div className="mb-6">
            <div className="rounded-lg shadow-sm p-4 bg-white border border-gray-200">
              <h4 className="text-md font-semibold mb-3 text-tpb-slate">
                ROI Scenarios Comparison
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-tpb-slate">Scenario</th>
                      <th className="text-left py-2 font-medium text-tpb-slate">Uplift %</th>
                      <th className="text-right py-2 font-medium text-tpb-slate">Payback Period</th>
                      <th className="text-right py-2 font-medium text-tpb-slate">Year-1 ROI</th>
                      <th className="text-right py-2 font-medium text-tpb-slate">Net Year-1 Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{scenario.name}</td>
                        <td className="py-2">{scenario.uplift}%</td>
                        <td className="py-2 text-right font-bold text-tpb-green">
                          {scenario.result.paybackMonths ? `${scenario.result.paybackMonths.toFixed(1)} months` : "N/A"}
                        </td>
                        <td className="py-2 text-right">{percent(scenario.result.year1Roi)}</td>
                        <td className="py-2 text-right">{currency(scenario.result.year1Net)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>
        
        {/* ROI Bar Chart */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3 text-tpb-slate">
            Before vs After – {upliftPct}% Uplift
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                <Bar dataKey="value" fill="#5ac59a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Year Profit Progression Chart */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3 text-tpb-slate">
            Multi-Year Profit Progression
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Year 1", value: result.year1Net, label: "Year-1 Net" },
                { name: "Year 2", value: result.year2Net, label: "Year-2 Net" },
                { name: "Year 3+", value: result.year3PlusMonthly * 12, label: "Annual Pure Profit" }
              ]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(val: number, name: string, props: any) => [
                    `$${val.toLocaleString()}`, 
                    props.payload.label
                  ]} 
                />
                <Bar dataKey="value" fill="#5ac59a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Year-3+ shows pure profit phase with no CapEx recovery needed
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Dynamic ROI Insights */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Monthly Net Increase</p>
            <p className="text-2xl font-bold text-tpb-green">
              ${result.monthlyNet.toLocaleString()}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Payback Period</p>
            <p className="text-2xl font-bold text-tpb-green">
              {result.paybackMonths?.toFixed(1) ?? "N/A"} months
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-semibold text-tpb-slate mb-2">Year-1 ROI</p>
            <p className="text-2xl font-bold text-tpb-green">
              {result.year1Roi ? `${(result.year1Roi * 100).toFixed(1)}%` : "N/A"}
            </p>
          </div>
        </div>

        {/* Multi-Year Projections */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3 text-tpb-slate">
            Multi-Year Projections
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <p className="font-semibold text-tpb-slate mb-2">Year-2 Net Profit</p>
              <p className="text-xl font-bold text-tpb-green">
                ${result.year2Net.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Pure profit phase</p>
            </div>
            <div className="card p-4 text-center">
              <p className="font-semibold text-tpb-slate mb-2">3-Year Cumulative</p>
              <p className="text-xl font-bold text-tpb-green">
                ${result.cumulative3Year.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total 3-year return</p>
            </div>
            <div className="card p-4 text-center">
              <p className="font-semibold text-tpb-slate mb-2">3-Year ROI</p>
              <p className="text-xl font-bold text-tpb-green">
                {result.cumulative3YearRoi ? `${(result.cumulative3YearRoi * 100).toFixed(1)}%` : "N/A"}
              </p>
              <p className="text-sm text-gray-600 mt-1">ROI continues improving</p>
            </div>
          </div>
        </div>

        {/* ROI Storytelling Snippet */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3 text-tpb-slate">
            ROI Story
          </h4>
          <div className="card p-4 bg-blue-50 border-blue-200">
            <p className="text-tpb-dark font-medium">
              {generateROIStory(result, inputs, campaignTitle)}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons - These will NOT be captured in PNG */}
      {showExport && (
        <div className="flex flex-wrap gap-3">
          <a 
            href="https://calendar.app.google/XztRVFqNLygX9FKFA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book ROI Demo
          </a>
          {canExportSnapshot && (
            <button 
              className="btn btn-secondary"
              onClick={onSnapshotExport || (() => {
                navigator.clipboard.writeText(snapshot);
                alert("ROI Snapshot copied to clipboard!");
              })}
            >
              Copy ROI Snapshot
            </button>
          )}
          {canExportPNG && (
            <button 
              className="btn btn-secondary"
              onClick={onPNGExport}
            >
              Download ROI as PNG
            </button>
          )}
        </div>
      )}
    </div>
  );
}
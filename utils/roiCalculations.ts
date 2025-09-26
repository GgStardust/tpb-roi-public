import packagesData from "../data/packages.json";

const PACKAGES = packagesData as Pkg[];

export type Pkg = { key: string; capex: number; monthly: number; includes: string };

export interface ROIInputs {
  pkgKey: string;
  extraCapex: number;
  revenue: number;
  upliftPct: number;
  marginPct: number;
}

export interface ROIResult {
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
}

export interface CampaignDefaults {
  revenue: number;
  upliftPct: number;
  marginPct: number;
  package: string;
}

/**
 * Pure function to calculate ROI based on inputs
 */
export function calculateROI(inputs: ROIInputs): ROIResult {
  const PACKAGES = packagesData as Pkg[];
  const pkg = PACKAGES.find(p => p.key === inputs.pkgKey) ?? PACKAGES[1];
  
  const capex = pkg.capex + (Number(inputs.extraCapex) || 0);
  const monthlyFees = pkg.monthly;
  const upliftMonthlyGrossProfit = inputs.revenue * (inputs.upliftPct/100) * (inputs.marginPct/100);
  const monthlyNet = upliftMonthlyGrossProfit - monthlyFees;
  const paybackMonths = monthlyNet > 0 ? (capex / monthlyNet) : null;
  const year1Fees = monthlyFees * 12;
  const year1Net = (12 * upliftMonthlyGrossProfit) - year1Fees - capex;
  const denom = (year1Fees + capex);
  const year1Roi = denom > 0 ? (year1Net / denom) : null;

  // Multi-year calculations
  const year2Fees = monthlyFees * 12;
  const year2Net = (12 * upliftMonthlyGrossProfit) - year2Fees; // No CapEx in year 2
  const year2Roi = year2Fees > 0 ? (year2Net / year2Fees) : null; // ROI on just the fees
  
  const year3PlusMonthly = upliftMonthlyGrossProfit - monthlyFees; // Pure profit after payback
  const cumulative3Year = year1Net + year2Net + (year3PlusMonthly * 12); // 3 years total
  const cumulative3YearRoi = (capex + (monthlyFees * 36)) > 0 ? (cumulative3Year / (capex + (monthlyFees * 36))) : null; // 3-year ROI

  return {
    pkg: pkg.key,
    capex,
    monthlyFees,
    upliftMonthlyGrossProfit,
    monthlyNet,
    paybackMonths,
    year1Fees,
    year1Net,
    year1Roi,
    year2Net,
    year2Roi,
    year3PlusMonthly,
    cumulative3Year,
    cumulative3YearRoi
  };
}

/**
 * Get all available packages
 */
export function getPackages(): Pkg[] {
  return packagesData as Pkg[];
}

/**
 * Get package details by key
 */
export function getPackageByKey(key: string): Pkg | undefined {
  const PACKAGES = packagesData as Pkg[];
  return PACKAGES.find(p => p.key === key);
}

/**
 * Generate ROI snapshot text for clipboard export
 */
export function generateROISnapshot(
  inputs: ROIInputs, 
  result: ROIResult, 
  campaignTitle?: string
): string {
  const baselineProfit = inputs.revenue * (inputs.marginPct / 100);
  const newProfit = baselineProfit + result.upliftMonthlyGrossProfit - result.monthlyFees;
  const annualIncrease = result.monthlyNet * 12;
  const totalInvestment = result.capex + (result.monthlyFees * 12);
  
  // Get package details
  const pkg = PACKAGES.find(p => p.key === result.pkg);
  const packageDetails = pkg?.includes || "Package details not available";
  
  const title = campaignTitle 
    ? `ROI Analysis – ${result.pkg} Package (${campaignTitle})`
    : `ROI Analysis – ${result.pkg} Package`;

  // Determine store size context
  const storeSize = inputs.revenue >= 300000 ? "large" : inputs.revenue >= 150000 ? "mid-size" : "small";
  
  // Add context based on uplift percentage
  const upliftContext = inputs.upliftPct >= 20 ? "aggressive" : inputs.upliftPct >= 10 ? "moderate" : "conservative";
  
  return `${title}

PACKAGE INCLUDES:
${packageDetails.split(',').map(item => `- ${item.trim()}`).join('\n')}

YOUR NUMBERS:
- Monthly Revenue: $${inputs.revenue.toLocaleString()}
- Projected Uplift: ${inputs.upliftPct}% (${upliftContext} scenario)
- Gross Margin: ${inputs.marginPct}%

YEAR-1 IMPACT:
- Monthly Profit Increase: $${result.monthlyNet.toLocaleString()}
- Annual Profit Increase: $${annualIncrease.toLocaleString()}
- Payback Period: ${result.paybackMonths?.toFixed(1) ?? "N/A"} months
- Year-1 ROI: ${result.year1Roi ? `${(result.year1Roi * 100).toFixed(1)}%` : "N/A"}

YEAR-2 IMPACT:
- Year-2 Net Profit: $${result.year2Net.toLocaleString()}
- Year-2 ROI: ${result.year2Roi ? `${(result.year2Roi * 100).toFixed(1)}%` : "N/A"}
- Monthly Pure Profit: $${result.year3PlusMonthly.toLocaleString()}
- No CapEx Recovery Needed (Pure Profit Phase)

YEAR-3+ ONGOING VALUE:
- Monthly Pure Profit: $${result.year3PlusMonthly.toLocaleString()}
- 3-Year Cumulative: $${result.cumulative3Year.toLocaleString()}
- 3-Year ROI: ${result.cumulative3YearRoi ? `${(result.cumulative3YearRoi * 100).toFixed(1)}%` : "N/A"}
- ROI continues to improve each year as CapEx is fully recovered

CONTEXT:
- ${storeSize.charAt(0).toUpperCase() + storeSize.slice(1)} store performance
- Industry average: 12-15% uplift with interactive displays
- Your scenario: ${inputs.upliftPct}% uplift (${upliftContext} estimate)

WHAT THIS MEANS:
- Break-even in ${result.paybackMonths?.toFixed(1) ?? "N/A"} months
- $${annualIncrease.toLocaleString()} additional annual profit
- Investment: $${totalInvestment.toLocaleString()} (CapEx + Year-1 fees)
- Return: ${result.year1Roi ? `${(result.year1Roi * 100).toFixed(1)}%` : "N/A"} in first year
- Year-2+: Pure profit phase with no CapEx recovery needed

FUTURE-PROOF INVESTMENT:
- The Peak Beyond is a software technology company, not just a kiosk manufacturer
- Your kiosks receive automatic software updates from our Innovation Lab
- Continuous adaptation to retail technology advancements and AI capabilities
- Software never goes out of date - always current with retail behavior trends
- Your customers always experience relevant, engaging interactions
- Technology evolves with shopping behavior, increasing basket size over time
- Prepared for future retail innovations your competitors aren't thinking about

NEXT STEPS:
1. Book 15-min ROI demo: www.cannabis-kiosks.com/book-a-demo
2. Custom package sizing for your store
3. Installation timeline & support

---
The Peak Beyond | Interactive Kiosk Solutions
info@thepeakbeyond.com | 415 579 1609`;
}

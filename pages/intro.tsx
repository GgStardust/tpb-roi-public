import React from "react";
import { useRouter } from "next/router";
import TPBHeader from "../components/TPBHeader";

export default function IntroPage() {
  const router = useRouter();

  const handleStartCalculator = () => {
    router.push('/calculator');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TPBHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-tpb-dark mb-6">
            ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Most dispensaries run on thin margins. Taxes and competition make it harder to grow, 
            yet every operator still has one lever in their control: <strong>store design</strong>. 
            Even a three to five percent lift in basket size can change a store's monthly profit.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 bg-tpb-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3-5%</span>
            </div>
            <h3 className="text-lg font-semibold text-tpb-dark mb-2">Basket Size Lift</h3>
            <p className="text-gray-600 text-sm">Small improvements in store design can significantly impact revenue</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 bg-tpb-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1-3</span>
            </div>
            <h3 className="text-lg font-semibold text-tpb-dark mb-2">Month Payback</h3>
            <p className="text-gray-600 text-sm">Most interactive kiosk investments pay for themselves quickly</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 bg-tpb-slate rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">300%+</span>
            </div>
            <h3 className="text-lg font-semibold text-tpb-dark mb-2">Year-1 ROI</h3>
            <p className="text-gray-600 text-sm">Strong returns on investment with ongoing monthly benefits</p>
          </div>
        </div>

        {/* CTA Section */}
        <div 
          onClick={handleStartCalculator}
          className="bg-white rounded-lg shadow-sm p-8 text-center cursor-pointer hover:shadow-md transition-shadow duration-200"
        >
          <h2 className="text-2xl font-bold text-tpb-dark mb-4">
            Run the ROI Calculator
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            See how quickly your store could recover investment. Try the calculator and get a clear 
            payback window based on your numbers. Model your store today and see if you are leaving money on the floor.
          </p>
          
          <div className="btn btn-primary text-lg px-8 py-4 inline-block">
            Start ROI Calculator →
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-tpb-dark mb-3">What You'll Calculate:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <ul className="space-y-2">
                <li>• Monthly revenue impact from interactive displays</li>
                <li>• Exact payback period for your investment</li>
                <li>• Year-1 and 3-year ROI projections</li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li>• Multi-location franchise calculations</li>
                <li>• Conservative, average, and optimistic scenarios</li>
                <li>• Downloadable ROI reports for stakeholders</li>
              </ul>
            </div>
          </div>
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

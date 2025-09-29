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
          <h1 className="text-4xl font-bold text-tpb-dark mb-4">
            How fast will interactive kiosks pay for themselves?
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            See your payback window and multi-year profit using your own store numbers.
          </p>
          <p className="text-sm text-gray-600">
            Projections are based on industry studies, consumer user behavior data collected in store, and more than 200 kiosk implementations across retail and cannabis.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 bg-tpb-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3% to 5%</span>
            </div>
            <h3 className="text-lg font-semibold text-tpb-dark mb-2">Basket size lift</h3>
            <p className="text-gray-600 text-sm">Even a 3% lift adds $3,600 per month for a $120,000 store.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 bg-tpb-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1 to 3</span>
            </div>
            <h3 className="text-lg font-semibold text-tpb-dark mb-2">Payback</h3>
            <p className="text-gray-600 text-sm">Interactive kiosk investments typically recover quickly with ongoing monthly benefits.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 bg-tpb-slate rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">300%+</span>
            </div>
            <h3 className="text-lg font-semibold text-tpb-dark mb-2">Year-1 ROI</h3>
            <p className="text-gray-600 text-sm">Strong returns when education and discovery are placed in the shopper's hands.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-tpb-dark mb-4">
            Start ROI Calculator
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            See how quickly your store could recover investment. Try the calculator and get a clear 
            payback window based on your numbers. Model your store today and see if you are leaving money on the floor.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleStartCalculator}
              className="btn btn-primary text-lg px-8 py-4 inline-block"
            >
              Start ROI Calculator
            </button>
            <div>
              <a 
                href="#" 
                className="text-sm text-tpb-green hover:text-tpb-dark underline"
              >
                See how operators use it → Case studies
              </a>
            </div>
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

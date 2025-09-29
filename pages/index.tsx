import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to intro page
    router.push('/intro');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-tpb-dark mb-4">TPB ROI Calculator</h1>
        <p className="text-gray-600">Redirecting to ROI Calculator...</p>
      </div>
    </div>
  );
}

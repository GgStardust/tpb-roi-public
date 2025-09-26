export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md ${className}`}>{children}</div>
  );
}

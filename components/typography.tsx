export function Heading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-xl font-bold text-tpb-dark mb-2 ${className}`}>{children}</h2>;
}

export function Subheading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-tpb-slate mb-2 ${className}`}>{children}</h3>;
}

export function BodyText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-base leading-relaxed text-gray-800 ${className}`}>{children}</p>;
}

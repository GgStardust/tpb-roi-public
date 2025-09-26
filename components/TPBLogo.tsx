import React from "react";

interface TPBLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TPBLogo({ className = "", size = 'md' }: TPBLogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-tpb-dark rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-tpb-green font-bold text-lg leading-tight">
            <div className="text-sm">The Peak</div>
            <div className="text-xl">Beyond</div>
          </div>
        </div>
      </div>
    </div>
  );
}

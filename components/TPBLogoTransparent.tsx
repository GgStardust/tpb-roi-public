import React from "react";

interface TPBLogoTransparentProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TPBLogoTransparent({ size = 'md', className = "" }: TPBLogoTransparentProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center p-1">
        <svg 
          viewBox="0 0 120 60" 
          className="w-full h-full"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        >
          <text 
            x="60" 
            y="25" 
            textAnchor="middle" 
            fill="#5ac59a"
            style={{ 
              fontFamily: 'Brush Script MT, cursive, serif, "Lucida Handwriting", "Comic Sans MS", cursive',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            The Peak
          </text>
          <text 
            x="60" 
            y="45" 
            textAnchor="middle" 
            fill="#5ac59a"
            style={{ 
              fontFamily: 'Brush Script MT, cursive, serif, "Lucida Handwriting", "Comic Sans MS", cursive',
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            Beyond
          </text>
        </svg>
      </div>
    </div>
  );
}

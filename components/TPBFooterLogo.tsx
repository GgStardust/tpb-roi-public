import React from "react";

interface TPBFooterLogoProps {
  className?: string;
}

export default function TPBFooterLogo({ className = "" }: TPBFooterLogoProps) {
  return (
    <div className={`absolute bottom-4 right-4 ${className}`}>
      <div className="w-16 h-16 opacity-20">
        <svg viewBox="0 0 200 80" className="w-full h-full">
          <text 
            x="100" 
            y="35" 
            textAnchor="middle" 
            className="fill-current"
            style={{ 
              fontFamily: 'Brush Script MT, cursive, serif',
              fontSize: '12px',
              fontWeight: 'bold',
              fill: '#5ac59a'
            }}
          >
            The Peak
          </text>
          <text 
            x="100" 
            y="60" 
            textAnchor="middle" 
            className="fill-current"
            style={{ 
              fontFamily: 'Brush Script MT, cursive, serif',
              fontSize: '14px',
              fontWeight: 'bold',
              fill: '#5ac59a'
            }}
          >
            Beyond
          </text>
        </svg>
      </div>
    </div>
  );
}

import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* 
      Proportions adjusted to create a 1:1 overall visual balance.
      The grey frame is positioned behind the sage green 'R'.
    */}
    
    {/* Background Frame (Light Grey) */}
    <rect 
      x="34" 
      y="18" 
      width="46" 
      height="60" 
      rx="4" 
      stroke="#cecdcb" 
      strokeWidth="10" 
      strokeLinejoin="round"
    />
    
    {/* Foreground 'R' Shape (Sage Green) */}
    <g 
      stroke="#9cb18e" 
      strokeWidth="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* 
        The 'R' consists of:
        1. A vertical stem that extends into a small horizontal base (L-shape).
        2. A rectangular loop.
        3. A slanted leg.
      */}
      
      {/* Main vertical stem and bottom extension */}
      <path d="M22 34 V82 H54" />
      
      {/* Top loop of the 'R' */}
      <path d="M22 34 H66 V58 H22" />
      
      {/* Slanted leg of the 'R' */}
      <path d="M48 58 L76 82" />
    </g>
  </svg>
);

export default Logo;

import React from 'react';

interface LocationCrossIconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}

const LocationCrossIcon: React.FC<LocationCrossIconProps> = ({ className, width = "200", height = "200", color = "#0070f3" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="0" width="24" height="24" fill="none"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.00001C8.68629 2.00001 6 4.68629 6 8.00001C6 13.25 12 22 12 22C12 22 18 13.25 18 8.00001C18 4.68629 15.3137 2.00001 12 2.00001ZM12 10C10.8954 10 10 9.10457 10 8.00001C10 6.89544 10.8954 6.00001 12 6.00001C13.1046 6.00001 14 6.89544 14 8.00001C14 9.10457 13.1046 10 12 10Z" fill={color}/>
      <path d="M12 7.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5 8H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default LocationCrossIcon;
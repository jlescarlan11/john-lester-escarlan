import React, { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <div 
      className={`card bg-base-200 w-full p-8 shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

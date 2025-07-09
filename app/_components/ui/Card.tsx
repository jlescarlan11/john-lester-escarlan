import React, { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="card  bg-base-200 w-full p-8 pt-12  shadow-sm">
      {children}
    </div>
  );
};

export default Card;

import React, { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="card w-full p-8 bg-base-200 shadow-xl">{children}</div>
  );
};

export default Card;

import React, { PropsWithChildren } from "react";

const SectionIntro = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-8 ">
      <p>{children}</p>
    </div>
  );
};

export default SectionIntro;

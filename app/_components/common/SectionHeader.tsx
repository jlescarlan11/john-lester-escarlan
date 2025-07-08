import React, { PropsWithChildren } from "react";

const SectionHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <h2 className="text-3xl font-bold">{children}</h2>
      <div className="border-b border-base-content/10 w-full max-w-3xs"></div>
    </div>
  );
};

export default SectionHeader;

import React from "react";

// Mock Layout component
export const MockLayout = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="layout">{children}</div>;
};

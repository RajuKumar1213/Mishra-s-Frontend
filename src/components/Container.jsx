import React from "react";

function Container({ children, width = "max-w-7xl", className = "" }) {
  return (
    <div
      className={`w-full px-4 sm:px-6 lg:px-8 mx-auto ${width} ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;

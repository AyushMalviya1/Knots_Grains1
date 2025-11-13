import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-full shadow transition ${className}`}
    >
      {children}
    </button>
  );
}

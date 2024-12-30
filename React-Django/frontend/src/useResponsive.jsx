import React, { useState, useEffect } from "react";

export const useResponsive = (breakpoints) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateIndex = () => {
      const width = window.innerWidth;
      const newIndex = breakpoints.findIndex((bp) => width <= bp);
      setIndex(newIndex === -1 ? breakpoints.length : newIndex);
    };
    updateIndex();
    window.addEventListener("resize", updateIndex);

    return () => window.removeEventListener("resize", updateIndex);
  }, [breakpoints]);
  return index;
};
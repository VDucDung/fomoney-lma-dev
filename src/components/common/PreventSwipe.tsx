'use client';

import { useEffect } from "react";

export default function PreventSwipe() {
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

    if (isMobile) {
      const preventSwipeHandler = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.body.addEventListener("touchmove", preventSwipeHandler, { passive: false });
      
      return () => {
        document.body.removeEventListener("touchmove", preventSwipeHandler);
      };
    }
  }, []);

  return null;
}

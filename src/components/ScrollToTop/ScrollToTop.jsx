import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousHistoryIndex = useRef(window.history.state?.idx);

  useEffect(() => {
    const currentHistoryIndex = window.history.state?.idx;
    const isBackNavigation =
      currentHistoryIndex !== undefined &&
      previousHistoryIndex.current !== undefined &&
      currentHistoryIndex < previousHistoryIndex.current;

    if (isBackNavigation) {
      // User navigated back, restore saved position
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
      }
    } else {
      // Forward navigation or manual click, scroll to top and clear old position
      window.scrollTo(0, 0);
      sessionStorage.removeItem(`scroll-${pathname}`);
    }

    // Update the ref for next navigation
    previousHistoryIndex.current = currentHistoryIndex;

    // Save scroll position as user scrolls
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;

// Thank you Claude Sonnet 4.5 :)

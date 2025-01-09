import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type SwipeInput = { deltaX: number; deltaY: number };

type MobileSwiperProps = PropsWithChildren<{
  // eslint-disable-next-line no-unused-vars
  onSwipe: (swipeInput: SwipeInput) => void;
}>;

export default function MobileSwiper({ children, onSwipe }: MobileSwiperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      return;
    }

    e.preventDefault();

    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        return;
      }

      e.preventDefault();

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      onSwipe({ deltaX, deltaY });

      setStartX(0);
      setStartY(0);
    },
    [startX, startY, onSwipe],
  );

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      return;
    }

    e.preventDefault(); // Prevent the page from scrolling when moving
  }, []);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false }); // Prevent scrolling on touchmove

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleTouchStart, handleTouchEnd, handleTouchMove]);

  return <div ref={wrapperRef}>{children}</div>;
}

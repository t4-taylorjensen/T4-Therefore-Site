import { useEffect, useRef, useState } from 'react';

/* Shared scroll-into-view gate — pairs with the .v2-reveal /
   .is-visible CSS convention (cinematic ease-out-expo) used across
   CMS Page V2's sections for a slow fade-rise entrance. One-shot:
   fires once when the element first crosses the threshold, then
   disconnects. */
export default function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

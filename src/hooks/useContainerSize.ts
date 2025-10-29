// src/hooks/useContainerSize.ts
import { useState, useEffect, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

// تغییر اصلی در این خط است: <T extends HTMLElement>
export function useContainerSize<T extends HTMLElement>(containerRef: RefObject<T>): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.unobserve(containerElement);
    };
  }, [containerRef]);

  return size;
}
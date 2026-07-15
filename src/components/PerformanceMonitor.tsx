import { useEffect, useRef } from 'react';
import { PageType } from '../types';

interface PerformanceMonitorProps {
  page: PageType;
}

export default function PerformanceMonitor({ page }: PerformanceMonitorProps) {
  const mountStartRef = useRef<number>(0);
  const isInitialLoadRef = useRef<boolean>(true);

  // Measure Initial App Load Metric once on application boot
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      // Use standard PerformanceNavigationTiming if available, otherwise fallback
      const [navigationEntry] = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      
      const loadTime = navigationEntry 
        ? navigationEntry.loadEventEnd - navigationEntry.startTime 
        : window.performance.now();

      const domInteractive = navigationEntry
        ? navigationEntry.domInteractive
        : 0;

      console.log(
        `%c ⚡ PLATELY COMMERCIAL PLATFORM DEPLOYMENT BOOT %c`,
        'background: #0f172a; color: #10b981; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        ''
      );
      
      if (loadTime > 0) {
        console.log(
          `%c → Initial Page Load Time : %c${loadTime.toFixed(2)}ms`,
          'color: #64748b; font-weight: 500;',
          'color: #059669; font-weight: bold;'
        );
      }
      
      if (domInteractive > 0) {
        console.log(
          `%c → DOM Interactive Latency: %c${domInteractive.toFixed(2)}ms`,
          'color: #64748b; font-weight: 500;',
          'color: #2563eb; font-weight: bold;'
        );
      }
    }
  }, []);

  // Measure Page-to-Page Route Navigation transitions
  useEffect(() => {
    mountStartRef.current = performance.now();

    return () => {
      // This cleanup runs when the page is unmounting or transitioning
      const unmountTime = performance.now();
      const elapsed = unmountTime - mountStartRef.current;
      
      console.log(
        `%c ⌛ [Page Transition] Leaving: %c${page} %c(view active for ${elapsed.toFixed(0)}ms)`,
        'color: #94a3b8;',
        'color: #f59e0b; font-weight: bold;',
        'color: #64748b; font-style: italic;'
      );
    };
  }, [page]);

  // Track rendering complete of the new page
  useEffect(() => {
    const renderDuration = performance.now() - mountStartRef.current;
    
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      console.log(
        `%c ✓ [System Ready] Mounted: %c${page} %c(Render latency: ${renderDuration.toFixed(2)}ms)`,
        'color: #10b981;',
        'color: #047857; font-weight: bold;',
        'color: #64748b; font-style: italic;'
      );
    } else {
      console.log(
        `%c 🔀 [Navigation Done] Switched to: %c${page} %c(Render latency: ${renderDuration.toFixed(2)}ms)`,
        'color: #3b82f6;',
        'color: #1d4ed8; font-weight: bold;',
        'color: #64748b; font-style: italic;'
      );
    }
  }, [page]);

  return null; // This is a utility wrapper that runs completely headlessly
}

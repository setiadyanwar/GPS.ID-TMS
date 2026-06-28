// Logic untuk query pagination dan search
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchStore } from '@/shared/store/searchStore';
import type { Vehicle } from '../types/vehicle';

const PAGE_SIZE = 6;

export const useVehicleGrid = (vehicles: Vehicle[], isLoading: boolean) => {
  const query = useSearchStore((state) => state.query);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset pagination when search query changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query]);

  const filteredVehicles = query.trim()
    ? vehicles.filter((v) => {
        const q = query.toLowerCase();
        return (
          v.plate?.toLowerCase().includes(q) ||
          v.device_name?.toLowerCase().includes(q) ||
          v.owner?.toLowerCase().includes(q)
        );
      })
    : vehicles;

  const loadMore = useCallback((totalVehicles: number) => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, totalVehicles));
      setIsLoadingMore(false);
    }, 300);
  }, []);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();

      if (!node || isLoadingMore || isLoading) return;

      const total = filteredVehicles.length;
      if (visibleCount >= total) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore(filteredVehicles.length);
          }
        },
        { rootMargin: '0px 0px 200px 0px', threshold: 0 }
      );

      observerRef.current.observe(node);
    },
    [visibleCount, filteredVehicles.length, isLoadingMore, isLoading, loadMore]
  );

  const visibleVehicles = filteredVehicles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVehicles.length;

  return {
    query,
    filteredVehicles,
    visibleVehicles,
    isLoadingMore,
    hasMore,
    sentinelRef,
    PAGE_SIZE,
  };
};

import { useMemo } from "react";
import { BirdData } from "../app/index";

export interface BirdStatsData {
  totalBirds: number;
  uniqueLocations: number;
  mostCommonLocation: string | null;
  firstCaptureDate: string | null;
  lastCaptureDate: string | null;
  birdsThisMonth: number;
  birdsThisYear: number;
  locationCounts: Record<string, number>;
}

/**
 * Custom hook to calculate statistics from bird collection
 * Memoized for performance - only recalculates when birds array changes
 */
export default function useBirdStats(birds: BirdData[]): BirdStatsData {
  return useMemo(() => {
    // Return empty stats if no birds
    if (birds.length === 0) {
      return {
        totalBirds: 0,
        uniqueLocations: 0,
        mostCommonLocation: null,
        firstCaptureDate: null,
        lastCaptureDate: null,
        birdsThisMonth: 0,
        birdsThisYear: 0,
        locationCounts: {},
      };
    }

    // Calculate location statistics
    const locations = birds
      .map((b) => b.location)
      .filter((loc): loc is string => !!loc && loc.trim() !== "");

    const uniqueLocs = new Set(locations);

    // Count occurrences of each location
    const locationCounts: Record<string, number> = {};
    locations.forEach((loc) => {
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });

    // Find most common location
    let mostCommon: string | null = null;
    let maxCount = 0;
    Object.entries(locationCounts).forEach(([loc, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = loc;
      }
    });

    // Parse and sort dates
    const dates = birds
      .map((b) => {
        try {
          return new Date(b.dateCaptured);
        } catch {
          return null;
        }
      })
      .filter((d): d is Date => d !== null && !isNaN(d.getTime()));

    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());

    // Calculate time-based statistics
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const birdsThisMonth = birds.filter((b) => {
      try {
        const d = new Date(b.dateCaptured);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      } catch {
        return false;
      }
    }).length;

    const birdsThisYear = birds.filter((b) => {
      try {
        const d = new Date(b.dateCaptured);
        return d.getFullYear() === currentYear;
      } catch {
        return false;
      }
    }).length;

    return {
      totalBirds: birds.length,
      uniqueLocations: uniqueLocs.size,
      mostCommonLocation: mostCommon,
      firstCaptureDate:
        sortedDates.length > 0 ? sortedDates[0].toLocaleDateString() : null,
      lastCaptureDate:
        sortedDates.length > 0
          ? sortedDates[sortedDates.length - 1].toLocaleDateString()
          : null,
      birdsThisMonth,
      birdsThisYear,
      locationCounts,
    };
  }, [birds]); // Only recalculate when birds array changes
}

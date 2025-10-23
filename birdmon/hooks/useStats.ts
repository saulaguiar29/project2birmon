import { useMemo, useCallback } from "react";

export type Observation = {
  id: string;
  species: string;
  timestamp: string; // ISO string
  // optional extra fields that other parts of the app may include
  [key: string]: any;
};

export type DayCount = {
  date: string; // YYYY-MM-DD
  count: number;
};

export type Stats = {
  totalCount: number;
  speciesCounts: Record<string, number>;
  percentBySpecies: Record<string, number>;
  mostObservedSpecies: string | null;
  countsByDay: DayCount[]; // sorted ascending by date
  getSpeciesHistory: (species: string) => DayCount[];
};

/**
 * useStats
 *
 * Compute derived statistics from an array of Observations.
 *
 * Notes:
 * - Purely derived from the observations array (no internal state).
 * - Uses useMemo for performance so callers can pass results to components without
 *   causing unnecessary re-renders.
 */
export default function useStats(observations: Observation[] = []): Stats {
  const stats = useMemo(() => {
    const speciesCounts: Record<string, number> = {};
    const dayMap: Record<string, Record<string, number>> = {}; // date -> species -> count
    const dayTotals: Record<string, number> = {}; // date -> total count

    const toDateKey = (iso: string) => {
      try {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "invalid";
        // YYYY-MM-DD
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      } catch {
        return "invalid";
      }
    };

    for (const obs of observations) {
      const species = (obs.species || "unknown").trim();
      speciesCounts[species] = (speciesCounts[species] || 0) + 1;

      const dateKey = toDateKey(obs.timestamp || "");
      if (!dayMap[dateKey]) dayMap[dateKey] = {};
      dayMap[dateKey][species] = (dayMap[dateKey][species] || 0) + 1;
      dayTotals[dateKey] = (dayTotals[dateKey] || 0) + 1;
    }

    const totalCount = observations.length;

    // percent by species
    const percentBySpecies: Record<string, number> = {};
    for (const [s, c] of Object.entries(speciesCounts)) {
      percentBySpecies[s] = totalCount > 0 ? (c / totalCount) * 100 : 0;
    }

    // most observed species
    let mostObservedSpecies: string | null = null;
    let maxCount = -1;
    for (const [s, c] of Object.entries(speciesCounts)) {
      if (c > maxCount) {
        maxCount = c;
        mostObservedSpecies = s;
      }
    }
    if (maxCount === -1) mostObservedSpecies = null;

    // counts by day (sorted)
    const countsByDay: DayCount[] = Object.keys(dayTotals)
      .sort() // lexicographic works for YYYY-MM-DD
      .map((date) => ({ date, count: dayTotals[date] }));

    const getSpeciesHistory = (species: string): DayCount[] => {
      const out: DayCount[] = [];
      const keys = Object.keys(dayMap).sort();
      for (const date of keys) {
        out.push({ date, count: dayMap[date][species] || 0 });
      }
      return out;
    };

    return {
      totalCount,
      speciesCounts,
      percentBySpecies,
      mostObservedSpecies,
      countsByDay,
      getSpeciesHistory,
    };
  }, [observations]);

  // Return stable callbacks (they are functions from the memoized object)
  return {
    totalCount: stats.totalCount,
    speciesCounts: stats.speciesCounts,
    percentBySpecies: stats.percentBySpecies,
    mostObservedSpecies: stats.mostObservedSpecies,
    countsByDay: stats.countsByDay,
    getSpeciesHistory: useCallback(
      (species: string) => stats.getSpeciesHistory(species),
      [stats]
    ),
  };
}

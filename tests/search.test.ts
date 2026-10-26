import { describe, it, expect } from "vitest";
import { searchLessons } from "@/lib/searchIndex";

describe("Search Indexer", () => {
  it("should return empty array for empty or whitespace query", () => {
    expect(searchLessons("")).toEqual([]);
    expect(searchLessons("   ")).toEqual([]);
  });

  it("should find lessons matching 'tamponade'", () => {
    const results = searchLessons("tamponade");
    expect(results.length).toBeGreaterThan(0);
    const slugs = results.map((r) => r.lessonSlug);
    expect(slugs.some((s) => s.includes("obstructive") || s.includes("classification"))).toBe(true);
  });

  it("should find lessons matching 'norepinephrine'", () => {
    const results = searchLessons("norepinephrine");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should perform case-insensitive search", () => {
    const lower = searchLessons("lactate");
    const upper = searchLessons("LACTATE");
    expect(lower.length).toBe(upper.length);
  });
});

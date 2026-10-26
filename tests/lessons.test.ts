import { describe, it, expect } from "vitest";
import { LESSONS, getLessonBySlug, getLessonByNumber } from "@/lib/data/lessons";

describe("Lessons Data Architecture", () => {
  it("should contain exactly 10 authored educational lessons", () => {
    expect(LESSONS.length).toBe(10);
  });

  it("should have sequential numbering from 1 to 10 with unique slugs", () => {
    const slugs = new Set<string>();
    LESSONS.forEach((lesson, idx) => {
      expect(lesson.number).toBe(idx + 1);
      expect(slugs.has(lesson.slug)).toBe(false);
      slugs.add(lesson.slug);
      expect(lesson.title.length).toBeGreaterThan(3);
      expect(lesson.subtitle.length).toBeGreaterThan(3);
      expect(lesson.description.length).toBeGreaterThan(15);
      expect(lesson.estimatedMinutes).toBeGreaterThan(0);
      expect(lesson.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("should accurately retrieve lesson by slug and by number", () => {
    const l1 = getLessonBySlug("what-is-shock");
    expect(l1).toBeDefined();
    expect(l1?.number).toBe(2);

    const l2 = getLessonByNumber(2);
    expect(l2?.slug).toBe("what-is-shock");
  });
});

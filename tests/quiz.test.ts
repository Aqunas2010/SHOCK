import { describe, it, expect } from "vitest";
import { QUIZ_QUESTIONS } from "@/lib/data/quiz";

describe("Quiz Database & Validation", () => {
  it("should contain at least 10 multiple-choice questions", () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(10);
  });

  it("should ensure every question has 4 options and a valid correctOptionId", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.options.length).toBe(4);
      const optionIds = q.options.map((opt) => opt.id);
      expect(optionIds).toContain(q.correctOptionId);
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(q.clinicalPearl.length).toBeGreaterThan(10);
    });
  });

  it("should cover all primary shock categories", () => {
    const categories = new Set(QUIZ_QUESTIONS.map((q) => q.category));
    expect(categories.has("Physiology")).toBe(true);
    expect(categories.has("Hypovolemic")).toBe(true);
    expect(categories.has("Cardiogenic")).toBe(true);
    expect(categories.has("Distributive")).toBe(true);
    expect(categories.has("Obstructive")).toBe(true);
    expect(categories.has("Assessment")).toBe(true);
    expect(categories.has("ABCDE")).toBe(true);
  });
});

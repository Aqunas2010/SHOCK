import { describe, it, expect } from "vitest";
import { calculateShockIndex, calculateMap } from "@/lib/clinicalCalculations";

describe("Clinical Calculators", () => {
  describe("calculateShockIndex", () => {
    it("should correctly compute normal Shock Index (e.g. HR 60, SBP 120 -> 0.5)", () => {
      const res = calculateShockIndex(60, 120);
      expect(res.shockIndex).toBe(0.5);
      expect(res.category).toBe("Normal");
      expect(res.interpretation).toContain("Normal physiological baseline");
    });

    it("should categorize compensated shock as Elevated Risk (e.g. HR 90, SBP 110 -> 0.82)", () => {
      const res = calculateShockIndex(90, 110);
      expect(res.shockIndex).toBe(0.82);
      expect(res.category).toBe("Elevated Risk");
      expect(res.interpretation).toContain("compensated circulatory compromise");
    });

    it("should categorize decompensated shock as Severe Shock (e.g. HR 120, SBP 90 -> 1.33)", () => {
      const res = calculateShockIndex(120, 90);
      expect(res.shockIndex).toBe(1.33);
      expect(res.category).toBe("Severe Shock");
      expect(res.clinicalAction).toContain("Immediate high-priority resuscitation");
    });

    it("should throw error if systolic blood pressure is <= 0", () => {
      expect(() => calculateShockIndex(100, 0)).toThrow("Systolic blood pressure must be greater than zero");
    });
  });

  describe("calculateMap", () => {
    it("should correctly calculate MAP for standard 120/80 (MAP ~ 93.3 mmHg)", () => {
      const res = calculateMap(120, 80);
      expect(res.map).toBe(93.3);
      expect(res.pulsePressure).toBe(40);
      expect(res.category).toBe("Adequate Perfusion");
    });

    it("should flag borderline perfusion when MAP is between 55 and 64 mmHg (e.g. 80/50 -> 60 mmHg)", () => {
      const res = calculateMap(80, 50);
      expect(res.map).toBe(60);
      expect(res.pulsePressure).toBe(30);
      expect(res.category).toBe("Borderline Perfusion");
    });

    it("should flag critical hypoperfusion when MAP < 55 mmHg (e.g. 70/40 -> 50 mmHg)", () => {
      const res = calculateMap(70, 40);
      expect(res.map).toBe(50);
      expect(res.category).toBe("Critical Hypoperfusion");
    });

    it("should throw an error when SBP <= DBP", () => {
      expect(() => calculateMap(80, 80)).toThrow("Systolic BP must be greater than Diastolic BP");
      expect(() => calculateMap(60, 90)).toThrow("Systolic BP must be greater than Diastolic BP");
    });
  });
});

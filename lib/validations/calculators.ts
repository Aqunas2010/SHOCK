import { z } from "zod";

export const shockIndexSchema = z.object({
  heartRate: z
    .number()
    .min(30, "Heart rate must be at least 30 bpm")
    .max(250, "Heart rate cannot exceed 250 bpm"),
  systolicBp: z
    .number()
    .min(30, "Systolic BP must be at least 30 mmHg")
    .max(260, "Systolic BP cannot exceed 260 mmHg"),
});

export const mapSchema = z.object({
  systolicBp: z
    .number()
    .min(40, "Systolic BP must be at least 40 mmHg")
    .max(260, "Systolic BP cannot exceed 260 mmHg"),
  diastolicBp: z
    .number()
    .min(20, "Diastolic BP must be at least 20 mmHg")
    .max(160, "Diastolic BP cannot exceed 160 mmHg"),
}).refine((data) => data.systolicBp > data.diastolicBp, {
  message: "Systolic blood pressure must be greater than diastolic blood pressure",
  path: ["systolicBp"],
});

export const searchSchema = z.object({
  query: z.string().trim().min(1, "Please enter a search query").max(100),
});

export const quizSubmissionSchema = z.object({
  answers: z.record(z.string(), z.string()),
  score: z.number().min(0).max(10),
  completedAt: z.string(),
});

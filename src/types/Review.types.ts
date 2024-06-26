import { z } from "zod";

export const ReviewFormSchema = z.object({
  company: z.string().min(1),
  companyOther: z.string().optional(),
  position: z.string().min(1),
  url: z.string().min(1),
  dateCreated: z.string().min(1).max(10),
  consent: z.boolean(),
  rating: z.number().min(1).max(5),
  difficulty: z.number().min(1).max(5),
  responsiveness: z.number().min(1).max(5),
  detailed: z.string().min(1),
  gotTheJob: z.boolean(),
  honey: z.string().max(0),
});

export type ReviewForm = z.infer<typeof ReviewFormSchema>;

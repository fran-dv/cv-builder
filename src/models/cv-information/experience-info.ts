import type { MonthYear } from "@/models";

export interface ExperienceInfo {
  jobTitle?: string;
  city?: string;
  employer?: string;
  startDate?: MonthYear;
  finishDate?: MonthYear | "present";
  description?: string;
}

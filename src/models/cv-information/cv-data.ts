import type { ExperienceInfo, PersonalInfo, SummaryInfo } from "@/models";

export interface CVData {
  personalInfo?: PersonalInfo;
  summaryInfo?: SummaryInfo;
  experencies?: ExperienceInfo[];
}

export type CVDataProperty = PersonalInfo | SummaryInfo;
export type CVDataPropertyKeys =
  | keyof PersonalInfo
  | keyof SummaryInfo
  | keyof ExperienceInfo;

export const emptyCVData: CVData = {
  personalInfo: {},
  summaryInfo: {},
  experencies: [],
};

import type { ExperienceInfo, PersonalInfo, SummaryInfo } from "@/models";

export interface CVData {
  personalInfo?: PersonalInfo;
  summaryInfo?: SummaryInfo;
  experienceInfo1?: ExperienceInfo;
  experienceInfo2?: ExperienceInfo;
  experienceInfo3?: ExperienceInfo;
}

export type CVDataProperty = PersonalInfo | SummaryInfo | ExperienceInfo;
export type CVDataPropertyKeys =
  | keyof PersonalInfo
  | keyof SummaryInfo
  | keyof ExperienceInfo;

export const emptyCVData: CVData = {
  personalInfo: {},
  summaryInfo: {},
  experienceInfo2: {},
  experienceInfo3: {},
  experienceInfo1: {},
};

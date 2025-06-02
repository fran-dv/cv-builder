import type { PersonalInfo } from "./personal-info";
import type { SummaryInfo } from "./summary-info";

export interface CVData {
  personalInfo?: PersonalInfo;
  summaryInfo?: SummaryInfo;
}

export type CVDataProperty = PersonalInfo | SummaryInfo;
export type CVDataPropertyKeys = keyof PersonalInfo | keyof SummaryInfo;

export const emptyCVData: CVData = {
  personalInfo: {},
  summaryInfo: {},
};

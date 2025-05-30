import type { PersonalInfo } from "./personal-info";

export interface CVData {
  personalInfo?: PersonalInfo;
}

export type CVDataProperty = PersonalInfo;

export const emptyCVData: CVData = {
  personalInfo: {},
};

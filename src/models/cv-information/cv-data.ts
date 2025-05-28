import type { PersonalInfo } from "./personal-info";

export interface CVData {
  personalInfo: PersonalInfo;
}

export const emptyCVData: CVData = {
  personalInfo: {},
};

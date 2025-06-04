import type {
  EducationInfo,
  ExperienceInfo,
  PersonalInfo,
  SummaryInfo,
} from "@/models";

export interface CVData {
  personalInfo?: PersonalInfo;
  summaryInfo?: SummaryInfo;
  experienceInfo1?: ExperienceInfo;
  experienceInfo2?: ExperienceInfo;
  experienceInfo3?: ExperienceInfo;
  educationInfo1?: EducationInfo;
  educationInfo2?: EducationInfo;
  educationInfo3?: EducationInfo;
}

export type CVDataProperty =
  | PersonalInfo
  | SummaryInfo
  | ExperienceInfo
  | EducationInfo;
export type CVDataPropertyKeys =
  | keyof PersonalInfo
  | keyof SummaryInfo
  | keyof ExperienceInfo
  | keyof EducationInfo;

export const emptyCVData: CVData = {
  personalInfo: {},
  summaryInfo: {},
  experienceInfo2: {},
  experienceInfo3: {},
  experienceInfo1: {},
  educationInfo1: {},
  educationInfo2: {},
  educationInfo3: {},
};

import type { callbackProps } from "@/components";
import type { CVData, CVDataProperty } from "./cv-data";
import type { PersonalInfo } from "./personal-info";
import type { SummaryInfo } from "./summary-info";
import type { ExperienceInfo } from "./experience-info";
import type { EducationInfo } from "./education-info";

export const formDataToCVData = ({
  data,
  dataType,
}: callbackProps): CVData | null => {
  let cvDataField: CVDataProperty;

  if (dataType === "personalInfo") {
    const dataToFormat = data as PersonalInfo;
    cvDataField = {
      name: dataToFormat.name,
      jobTitle: dataToFormat.jobTitle,
      email: dataToFormat.email,
      phone: dataToFormat.phone
        ? !isNaN(Number(dataToFormat.phone))
          ? Number(dataToFormat.phone)
          : undefined
        : undefined,
      city: dataToFormat.city,
    };
  }

  if (dataType === "summaryInfo") {
    const dataToFormat = data as SummaryInfo;
    cvDataField = {
      summary: dataToFormat.summary as string | undefined,
    };
  }

  if (
    dataType === "experienceInfo1" ||
    dataType === "experienceInfo2" ||
    dataType === "experienceInfo3"
  ) {
    const dataToFormat = data as ExperienceInfo;
    cvDataField = {
      jobTitle: dataToFormat.jobTitle,
      city: dataToFormat.city,
      employer: dataToFormat.employer,
      startDate: dataToFormat.startDate,
      finishDate: dataToFormat.finishDate,
      description: dataToFormat.description,
    };
  }

  if (
    dataType === "educationInfo1" ||
    dataType === "educationInfo2" ||
    dataType === "educationInfo3"
  ) {
    const dataToFormat = data as EducationInfo;
    cvDataField = {
      degree: dataToFormat.degree,
      city: dataToFormat.city,
      school: dataToFormat.school,
      startDate: dataToFormat.startDate,
      finishDate: dataToFormat.finishDate,
      description: dataToFormat.description,
    };
  }

  return {
    [dataType]: cvDataField!,
  };
};

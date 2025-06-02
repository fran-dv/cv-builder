import type { callbackProps } from "@/components";
import type { CVData, CVDataProperty } from "./cv-data";
import type { PersonalInfo } from "./personal-info";
import type { SummaryInfo } from "./summary-info";

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

  return {
    [dataType]: cvDataField!,
  };
};

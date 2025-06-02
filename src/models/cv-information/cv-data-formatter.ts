import type { callbackProps } from "@/components";
import type { CVData, CVDataProperty } from "./cv-data";

export const formDataToCVData = ({
  data,
  dataType,
}: callbackProps): CVData | null => {
  let cvDataField: CVDataProperty;
  switch (dataType) {
    case "personalInfo":
      cvDataField = {
        name: data?.name as string | undefined,
        jobTitle: data?.jobTitle as string | undefined,
        email: data?.email as string | undefined,
        phone: data?.phone ? Number(data.phone) : undefined,
        city: data?.city as string | undefined,
      };
      break;
  }

  return {
    [dataType]: cvDataField!,
  };
};

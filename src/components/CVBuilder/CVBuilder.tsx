import { CVPreview, PersonalInfoBlock } from "@/components";
import { type CVData, type CVDataProperty, emptyCVData } from "@/models";
import { useState } from "react";
import "./CVBuilder.css";

export interface callbackProps {
  dataType: keyof CVData;
  data?: CVDataProperty;
}

const formDataToCVData = ({ data, dataType }: callbackProps): CVData | null => {
  console.log("name: ", data?.name);
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

export const CVBuilder = () => {
  const [CVData, setCVData] = useState<CVData>(emptyCVData);
  const [CVCurrentPreviewData, setCVCurrentPreviewData] =
    useState<CVData>(CVData);

  const onInputChange = ({ data, dataType }: callbackProps) => {
    if (!data) {
      console.error("Any data was received");
      return;
    }

    const newCVData: CVData | null = formDataToCVData({
      data: data,
      dataType: dataType,
    });

    if (!newCVData) {
      console.error("Error obtaining form data");
      return;
    }

    console.log("cv data: ", newCVData);

    setCVCurrentPreviewData((prev) => {
      const prevSection = prev[dataType] ?? {};
      const newSection = newCVData[dataType] ?? {};

      const filteredNewSection: Record<string, string | number> = {};
      for (const key in newSection) {
        const value = newSection[key as keyof CVDataProperty];
        if (value !== undefined && value !== "") {
          filteredNewSection[key] = value;
        }
      }

      return {
        ...prev,
        [dataType]: {
          ...prevSection,
          ...filteredNewSection,
        },
      };
    });
  };

  const onSaveData = ({ data }: callbackProps) => {
    if (!data) {
      console.error("Any data was received");
      return;
    }
    setCVData(CVCurrentPreviewData);
  };

  const onExitWithoutSave = () => {
    setCVCurrentPreviewData(CVData);
  };

  return (
    <>
      <div className="left-column">
        <PersonalInfoBlock
          onChange={onInputChange}
          onSubmit={onSaveData}
          onExitWithoutSubmit={onExitWithoutSave}
        />
      </div>
      <div className="right-column">
        <CVPreview
          personalInfo={
            CVCurrentPreviewData.personalInfo
              ? CVCurrentPreviewData.personalInfo
              : {}
          }
        />
      </div>
    </>
  );
};

import { CVPreview, PersonalInfoBlock } from "@/components";
import { type PersonalInfo, type CVData, emptyCVData } from "@/models";
import { useState } from "react";
import "./CVBuilder.css";

export interface callbackProps {
  personalInfo?: PersonalInfo;
}

export const CVBuilder = () => {
  const [CVData, setCVData] = useState<CVData>(emptyCVData);
  const [CVCurrentPreviewData, setCVCurrentPreviewData] =
    useState<CVData>(CVData);

  const onInputChange = ({ personalInfo }: callbackProps) => {
    if (!personalInfo) {
      console.error("Any data was received");
      return;
    }
    setCVCurrentPreviewData((prev) => {
      const updated = {
        ...prev,
        personalInfo: personalInfo,
      };
      return updated;
    });
  };

  const onSaveData = ({ personalInfo }: callbackProps) => {
    if (!personalInfo) {
      console.error("Any data was received");
      return;
    }
    setCVData(CVCurrentPreviewData);
  };

  const onExitWithoutSave = () => {
    setCVCurrentPreviewData(CVData);
    console.log("Exit!");
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
        <CVPreview personalInfo={CVCurrentPreviewData.personalInfo} />
      </div>
    </>
  );
};

import {
  CVPreview,
  IconButton,
  PersonalInfoBlock,
  SummaryInfoBlock,
  ExperiencesInfoBlock,
  EducationInfoBlock,
} from "@/components";
import {
  type CVData,
  type CVDataProperty,
  emptyCVData,
  formDataToCVData,
} from "@/models";
import { useRef, useState } from "react";
import "./CVBuilder.css";
import { useMediaQuery } from "usehooks-ts";

export interface callbackProps {
  dataType: keyof CVData;
  data?: CVDataProperty;
}

export const CVBuilder = () => {
  const [CVData, setCVData] = useState<CVData>(emptyCVData);
  const [CVCurrentPreviewData, setCVCurrentPreviewData] =
    useState<CVData>(CVData);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(-1);
  const previewDialog = useRef<HTMLDialogElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 850px)");

  const onInputChange = ({ data, dataType }: callbackProps) => {
    if (!data) {
      console.error("Any data was received");
      return;
    }

    // handle items deletion
    if (Object.keys(data).length === 0) {
      setCVCurrentPreviewData((prev) => {
        const newState = { ...prev };
        newState[dataType] = {};
        // save the deletion
        setCVData(newState);
        return newState;
      });
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

    setCVCurrentPreviewData((prev) => {
      const prevSection = prev[dataType] ?? {};
      const newSection = newCVData[dataType] ?? {};

      return {
        ...prev,
        [dataType]: {
          ...prevSection,
          ...newSection,
        },
      };
    });
  };

  const closeActiveBlock = () => {
    setActiveBlockIndex(-1);
  };

  const onSaveData = (close: boolean = true) => {
    setCVData(CVCurrentPreviewData);
    if (close) {
      closeActiveBlock();
    }
  };

  const onExitWithoutSave = () => {
    setCVCurrentPreviewData(CVData);
    closeActiveBlock();
  };

  const handleDialogClose = () => {
    previewDialog.current?.close();
    previewDialog.current?.removeEventListener("click", handleBackdropClick);
    setPreviewOpen(false);
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === previewDialog.current) {
      handleDialogClose();
    }
  };

  // preview toggle button to small screens
  const openDialog = () => {
    setPreviewOpen(true);

    setTimeout(() => {
      previewDialog.current?.showModal();
      previewDialog.current?.addEventListener("click", handleBackdropClick);
    }, 0);
  };

  const rightColumn = (
    <div className="right-column">
      <CVPreview
        personalInfo={
          CVCurrentPreviewData.personalInfo
            ? CVCurrentPreviewData.personalInfo
            : {}
        }
        summaryInfo={
          CVCurrentPreviewData.summaryInfo
            ? CVCurrentPreviewData.summaryInfo
            : {}
        }
        experienceInfo1={
          CVCurrentPreviewData.experienceInfo1
            ? CVCurrentPreviewData.experienceInfo1
            : {}
        }
        experienceInfo2={
          CVCurrentPreviewData.experienceInfo2
            ? CVCurrentPreviewData.experienceInfo2
            : {}
        }
        experienceInfo3={
          CVCurrentPreviewData.experienceInfo3
            ? CVCurrentPreviewData.experienceInfo3
            : {}
        }
      />
    </div>
  );

  const BlockIndexes = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
  } as const;

  return (
    <>
      <div className="left-column">
        <PersonalInfoBlock
          onChange={onInputChange}
          onSubmit={onSaveData}
          onExitWithoutSubmit={onExitWithoutSave}
          isActive={activeBlockIndex === BlockIndexes.first}
          onShow={() => setActiveBlockIndex(BlockIndexes.first)}
          currentData={CVData}
        />
        <SummaryInfoBlock
          onChange={onInputChange}
          onSubmit={onSaveData}
          onExitWithoutSubmit={onExitWithoutSave}
          isActive={activeBlockIndex === BlockIndexes.second}
          onShow={() => setActiveBlockIndex(BlockIndexes.second)}
          currentData={CVData}
        />
        <ExperiencesInfoBlock
          onChange={onInputChange}
          onSubmit={onSaveData}
          onExitWithoutSubmit={onExitWithoutSave}
          isActive={activeBlockIndex === BlockIndexes.third}
          onShow={() => setActiveBlockIndex(BlockIndexes.third)}
          currentData={CVData}
        />
        <EducationInfoBlock
          onChange={onInputChange}
          onSubmit={onSaveData}
          onExitWithoutSubmit={onExitWithoutSave}
          isActive={activeBlockIndex === BlockIndexes.fourth}
          onShow={() => setActiveBlockIndex(BlockIndexes.fourth)}
          currentData={CVData}
        />
      </div>
      {isDesktop && rightColumn}
      {!isDesktop && previewOpen && (
        <dialog
          className="preview-dialog"
          onClose={handleDialogClose}
          ref={previewDialog}
        >
          {rightColumn}
        </dialog>
      )}

      {!isDesktop && (
        <IconButton
          onClick={openDialog}
          className="toggle-preview"
          type="preview"
          title="Show CV Preview"
        />
      )}
    </>
  );
};

import { CVPreview, IconButton, PersonalInfoBlock } from "@/components";
import { type CVData, type CVDataProperty, emptyCVData } from "@/models";
import { useRef, useState } from "react";
import "./CVBuilder.css";
import { useMediaQuery } from "usehooks-ts";

export interface callbackProps {
  dataType: keyof CVData;
  data?: CVDataProperty;
}

const formDataToCVData = ({ data, dataType }: callbackProps): CVData | null => {
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
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 851px)");
  const previewDialog = useRef<HTMLDialogElement | null>(null);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(-1);

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

    setCVCurrentPreviewData((prev) => {
      const prevSection = prev[dataType] ?? {};
      const newSection = newCVData[dataType] ?? {};

      const filteredNewSection: Record<string, string | number> = {};
      for (const key in newSection) {
        const value = newSection[key as keyof CVDataProperty];
        if (value !== undefined) {
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

  const closeActiveBlock = () => {
    setActiveBlockIndex(-1);
  };

  const onSaveData = ({ data }: callbackProps) => {
    if (!data) {
      console.error("Any data was received");
      return;
    }
    setCVData(CVCurrentPreviewData);
    closeActiveBlock();
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

  // toggle preview button to small screens
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
      />
    </div>
  );

  return (
    <>
      <div className="left-column">
        <PersonalInfoBlock
          onChange={onInputChange}
          onSubmit={onSaveData}
          onExitWithoutSubmit={onExitWithoutSave}
          isActive={activeBlockIndex === 0}
          onShow={() => setActiveBlockIndex(0)}
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

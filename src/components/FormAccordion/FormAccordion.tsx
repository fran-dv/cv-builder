import type { callbackProps, FormField } from "@/components";
import React from "react";
import { IconButton, Form } from "@/components";
import "./FormAccordion.css";
import type { CVData } from "@/models";

interface Props<K extends keyof CVData> {
  fields: FormField[];
  dataType: K;
  onChange: ({ data, dataType }: callbackProps) => void;
  onSubmit: ({ data, dataType }: callbackProps) => void;
  onExitWithoutSubmit: () => void;
  title: string;
  isActive: boolean;
  onShow: () => void;
  blockIcon?: React.ReactNode;
  currentData: CVData;
}

export const FormAccordion = <K extends keyof CVData>({
  fields,
  dataType,
  onChange,
  onSubmit,
  onExitWithoutSubmit,
  title,
  isActive,
  onShow,
  blockIcon,
  currentData,
}: Props<K>) => {
  const handleClose = () => {
    onExitWithoutSubmit();
  };

  const showForm = () => {
    onShow();
  };

  return (
    <div className={`info-block ${isActive ? "expanded" : ""}`}>
      <div className="closed-block">
        {blockIcon}
        <h2 className="block-title">{title}</h2>
        <IconButton
          onClick={isActive ? handleClose : showForm}
          type="arrowDown"
          className={`block-arrow-down ${isActive ? "rotated" : ""}`}
        />
      </div>

      {isActive && (
        <div>
          <Form
            fields={fields}
            onChange={onChange}
            onSubmit={onSubmit}
            dataType={dataType}
            currentData={currentData}
            exited={!isActive}
          />
        </div>
      )}
    </div>
  );
};

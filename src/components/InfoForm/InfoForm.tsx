import type { callbackProps } from "@/components";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { IconButton } from "@/components";
import "./InfoForm.css";
import type { CVData, CVDataPropertyKeys } from "@/models";

export interface FormField {
  id: string;
  name: CVDataPropertyKeys;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

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

export const InfoForm = <K extends keyof CVData>({
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
  const initialValues = {};
  const [formValues, setFormValues] = useState<CVData[K]>(initialValues);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updated = { ...formValues, [name]: value };
    setFormValues(updated);
    onChange({ data: updated, dataType: dataType });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ data: formValues, dataType: dataType });
  };

  const handleClose = () => {
    setFormValues(currentData[dataType]);
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
          <form onSubmit={handleSubmit}>
            {fields.map((field) => {
              const currentFieldValue = formValues
                ? (formValues as typeof dataType)[
                    field.name as keyof typeof dataType
                  ]
                  ? ((formValues as typeof dataType)[
                      field.name as keyof typeof dataType
                    ] as string | number)
                  : ""
                : "";
              return (
                <div key={field.id} className="form-group">
                  <label htmlFor={field.id}>
                    {field.label}
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        name={field.name}
                        value={currentFieldValue}
                        onChange={handleInputChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        maxLength={1200}
                        rows={5}
                        cols={10}
                        style={{ resize: "none" }}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.name}
                        value={currentFieldValue}
                        onChange={handleInputChange}
                        required={field.required}
                        placeholder={field.placeholder}
                      />
                    )}
                  </label>
                </div>
              );
            })}
            <button type="submit" className="submit-button">
              <p>Save</p>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

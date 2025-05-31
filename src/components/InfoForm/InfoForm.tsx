import type { callbackProps } from "@/components";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { IconButton } from "@/components";
import "./InfoForm.css";
import type { CVData, CVDataProperty } from "@/models";

export interface FormField {
  id: string;
  name: keyof CVDataProperty;
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            {fields.map((field) => (
              <div key={field.id} className="form-group">
                <label htmlFor={field.id}>
                  {field.label}
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={
                      formValues
                        ? formValues[field.name]
                          ? (formValues[field.name] as string | number)
                          : ""
                        : ""
                    }
                    onChange={handleInputChange}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                </label>
              </div>
            ))}
            <button type="submit" className="submit-button">
              <p>Save</p>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

import type { callbackProps } from "@/components";
import type { CVData, CVDataPropertyKeys } from "@/models";
import { useState, type ChangeEvent, type FormEvent } from "react";

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
  currentData: CVData;
  exited: boolean;
}

export const Form = <K extends keyof CVData>({
  fields,
  dataType,
  onChange,
  onSubmit,
  currentData,
  exited,
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

  if (exited) {
    setFormValues(currentData[dataType]);
  }

  return (
    <>
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
    </>
  );
};

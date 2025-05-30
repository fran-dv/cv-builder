import type { callbackProps } from "@/components";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { IconButton } from "@/components";
import "@/shared-styles/InfoBlocks.css";
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
  title?: string;
}

export const InfoForm = <K extends keyof CVData>({
  fields,
  dataType,
  onChange,
  onSubmit,
  onExitWithoutSubmit,
}: Props<K>) => {
  const initialValues = {};
  const [formValues, setFormValues] = useState<CVData[K]>(initialValues);
  const formRef = useRef<HTMLFormElement | null>(null);

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
    //formRef.current?.reset();
    setFormValues(initialValues);
    onExitWithoutSubmit();
  };

  return (
    <div className="info-block">
      <IconButton type="exit" onClick={handleClose} className="exit-button" />
      <form onSubmit={handleSubmit} ref={formRef}>
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
  );
};

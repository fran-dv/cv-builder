import type { callbackProps } from "@/components";
import type { PersonalInfo } from "@/models";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import "@/shared-styles/InfoBlocks.css";
import { IconButton } from "@/components";

interface Props {
  onChange: ({ personalInfo }: callbackProps) => void;
  onSubmit: ({ personalInfo }: callbackProps) => void;
  onExitWithoutSubmit: () => void;
}

const InputsIDs = {
  name: "name-input",
  jobTitle: "job-title-input",
  email: "email-input",
  phone: "phone-input",
  city: "city-input",
} as const;

const PersonalInfoFieldMap = {
  [InputsIDs.name]: "name",
  [InputsIDs.jobTitle]: "jobTitle",
  [InputsIDs.email]: "email",
  [InputsIDs.phone]: "phone",
  [InputsIDs.city]: "city",
};

export const PersonalInfoBlock = ({
  onChange,
  onSubmit,
  onExitWithoutSubmit,
}: Props) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newValue = id === InputsIDs.phone ? parseInt(value) : value;

    if (!(id in PersonalInfoFieldMap)) {
      console.error("Invalid input");
      return;
    }

    const fieldName =
      PersonalInfoFieldMap[id as keyof typeof PersonalInfoFieldMap];

    setPersonalInfo((previous) => {
      const updated = { ...previous, [fieldName]: newValue };
      onChange({ personalInfo: updated });
      return updated;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ personalInfo: personalInfo });
  };

  const handleClose = () => {
    formRef.current?.reset();
    onExitWithoutSubmit();
  };

  return (
    <div className="info-block">
      <IconButton type="exit" onClick={handleClose} className="exit-button" />
      <form action="" onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="name-input">
            Full name:
            <input
              type="text"
              id={InputsIDs.name}
              name="name"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor={InputsIDs.jobTitle}>
            Job title:
            <input
              type="text"
              id={InputsIDs.jobTitle}
              name="job-title"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor={InputsIDs.email}>
            Email:
            <input
              type="email"
              id={InputsIDs.email}
              name="email"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor={InputsIDs.phone}>
            Phone number:
            <input
              type="number"
              id={InputsIDs.phone}
              name="phone"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor={InputsIDs.city}>
            City/Town
            <input
              type="text"
              id={InputsIDs.city}
              name="city"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          <p>Save</p>
        </button>
      </form>
    </div>
  );
};

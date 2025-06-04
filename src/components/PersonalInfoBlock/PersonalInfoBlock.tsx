import { FormAccordion, Icon } from "@/components";
import type { FormField, callbackProps } from "@/components";
import type { CVData, CVDataPropertyKeys } from "@/models";

interface Props {
  onChange: ({ data }: callbackProps) => void;
  onSubmit: () => void;
  onExitWithoutSubmit: () => void;
  isActive: boolean;
  onShow: () => void;
  currentData: CVData;
}

const InputsIDs = {
  name: "name-input",
  jobTitle: "job-title-input",
  email: "email-input",
  phone: "phone-input",
  city: "city-input",
} as const;

const PersonalInfoFieldMap: Record<string, CVDataPropertyKeys> = {
  [InputsIDs.name]: "name",
  [InputsIDs.jobTitle]: "jobTitle",
  [InputsIDs.email]: "email",
  [InputsIDs.phone]: "phone",
  [InputsIDs.city]: "city",
};

const dataType: keyof CVData = "personalInfo";

const formFields: Array<FormField> = [
  {
    id: InputsIDs.name,
    name: PersonalInfoFieldMap[InputsIDs.name],
    label: "Full name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    id: InputsIDs.jobTitle,
    name: PersonalInfoFieldMap[InputsIDs.jobTitle],
    label: "Job Title",
    type: "text",
    placeholder: "Enter your job title",
  },
  {
    id: InputsIDs.email,
    name: PersonalInfoFieldMap[InputsIDs.email],
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: InputsIDs.phone,
    name: PersonalInfoFieldMap[InputsIDs.phone],
    label: "Phone",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    id: InputsIDs.city,
    name: PersonalInfoFieldMap[InputsIDs.city],
    label: "City",
    type: "text",
    placeholder: "Enter your city",
  },
];

export const PersonalInfoBlock = ({
  onChange,
  onSubmit,
  onExitWithoutSubmit,
  isActive,
  onShow,
  currentData,
}: Props) => {
  return (
    <FormAccordion
      fields={formFields}
      dataType={dataType}
      onChange={onChange}
      onSubmit={onSubmit}
      onExitWithoutSubmit={onExitWithoutSubmit}
      isActive={isActive}
      onShow={onShow}
      title="Personal Information"
      blockIcon={<Icon type="person" />}
      currentData={currentData}
    />
  );
};

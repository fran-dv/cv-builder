import {
  FormAccordion,
  FormFieldTypes,
  Icon,
  type callbackProps,
  type FormField,
} from "@/components";
import type { CVData } from "@/models";

interface Props {
  onChange: ({ data, dataType }: callbackProps) => void;
  onSubmit: (close?: boolean) => void;
  onExitWithoutSubmit: () => void;
  isActive: boolean;
  onShow: () => void;
  currentData: CVData;
}

const fields: Array<FormField> = [
  {
    id: "degree",
    name: "degree",
    label: "Degree",
    type: "text",
    placeholder: "Enter the degree or field of study",
  },
  {
    id: "school",
    name: "school",
    label: "School",
    type: "text",
    placeholder: "Enter the school (nothing if self-taught)",
  },
  {
    id: "city",
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter the city of the school (your house if self-taught)",
  },
  {
    id: "start-date",
    name: "startDate",
    label: "Start Date",
    type: "text",
    placeholder: "Enter the start date",
  },
  {
    id: "finish-date",
    name: "finishDate",
    label: "Finish Date",
    type: "text",
    placeholder: "Enter the start date",
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: FormFieldTypes.textarea,
    placeholder:
      "Enter a brief description of the education (if you are self-taught explain it here)",
  },
];

export const EducationInfoBlock = ({
  onChange,
  onSubmit,
  onExitWithoutSubmit,
  isActive,
  onShow,
  currentData,
}: Props) => {
  return (
    <FormAccordion
      fields={fields}
      dataType={{
        1: "educationInfo1",
        2: "educationInfo2",
        3: "educationInfo3",
      }}
      onChange={onChange}
      onSubmit={onSubmit}
      onExitWithoutSubmit={onExitWithoutSubmit}
      title="Education"
      isActive={isActive}
      onShow={onShow}
      blockIcon={<Icon type="education" />}
      currentData={currentData}
      multiItems={true}
    />
  );
};

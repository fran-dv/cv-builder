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
    id: "job-title",
    name: "jobTitle",
    label: "Job title",
    type: "text",
    placeholder: "Enter the job title",
  },
  {
    id: "city",
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter the city of the job",
  },
  {
    id: "employer",
    name: "employer",
    label: "Employer",
    type: "text",
    placeholder: "Enter the employer",
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
    placeholder: "Enter a brief description of the job",
  },
];

export const ExperiencesInfoBlock = ({
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
        1: "experienceInfo1",
        2: "experienceInfo2",
        3: "experienceInfo3",
      }}
      onChange={onChange}
      onSubmit={onSubmit}
      onExitWithoutSubmit={onExitWithoutSubmit}
      title="Professional experiences"
      isActive={isActive}
      onShow={onShow}
      blockIcon={<Icon type="experience" />}
      currentData={currentData}
      multiItems={true}
    />
  );
};

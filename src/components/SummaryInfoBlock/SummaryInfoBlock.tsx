import {
  Icon,
  InfoForm,
  type callbackProps,
  type FormField,
} from "@/components";
import type { CVData } from "@/models";

interface Props {
  onChange: ({ data, dataType }: callbackProps) => void;
  onSubmit: ({ data, dataType }: callbackProps) => void;
  onExitWithoutSubmit: () => void;
  isActive: boolean;
  onShow: () => void;
  currentData: CVData;
}

const fields: Array<FormField> = [
  {
    id: "summary",
    name: "summary",
    label: "Summary",
    type: "textarea",
    placeholder: "Write a summary of your profile",
  },
];

export const SummaryInfoBlock = ({
  onChange,
  onSubmit,
  onExitWithoutSubmit,
  isActive,
  onShow,
  currentData,
}: Props) => {
  return (
    <InfoForm
      fields={fields}
      dataType="summaryInfo"
      onChange={onChange}
      onSubmit={onSubmit}
      onExitWithoutSubmit={onExitWithoutSubmit}
      title="Summary"
      isActive={isActive}
      onShow={onShow}
      blockIcon={<Icon type="summary" />}
      currentData={currentData}
    />
  );
};

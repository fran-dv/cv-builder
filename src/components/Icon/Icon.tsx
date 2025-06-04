import emailIcon from "/src/assets/email-icon.svg";
import phoneIcon from "@/assets/phone-icon.svg";
import cityIcon from "@/assets/city-icon.svg";
import exitIcon from "@/assets/exit-icon.svg";
import previewIcon from "@/assets/preview-icon.svg";
import arrowDownIcon from "@/assets/arrow-down-icon.svg";
import personIcon from "@/assets/person-icon.svg";
import summaryIcon from "@/assets/summary-icon.svg";
import deleteIcon from "@/assets/delete-icon.svg";
import experienceIcon from "@/assets/experience-icon.svg";
import educationIcon from "@/assets/education-icon.svg";

interface IconsFiles {
  email: string;
  phone: string;
  city: string;
  exit: string;
  preview: string;
  arrowDown: string;
  person: string;
  summary: string;
  delete: string;
  experience: string;
  education: string;
}

const IconsFileNames: IconsFiles = {
  email: emailIcon,
  phone: phoneIcon,
  city: cityIcon,
  exit: exitIcon,
  preview: previewIcon,
  arrowDown: arrowDownIcon,
  person: personIcon,
  summary: summaryIcon,
  delete: deleteIcon,
  experience: experienceIcon,
  education: educationIcon,
} as const;

export type IconsTypes = keyof IconsFiles;

interface Props {
  type: IconsTypes;
  className?: string;
  title?: string;
}

export const Icon = ({ type, className = "icon" }: Props) => {
  const fileName = IconsFileNames[type];
  const alt = `${type[0].toUpperCase() + type.slice(1)} icon`;
  return <img className={className} src={fileName} alt={alt} />;
};

interface IconsFiles {
  email: string;
  phone: string;
  city: string;
  exit: string;
  preview: string;
}

const IconsFileNames: IconsFiles = {
  email: "email-icon.svg",
  phone: "phone-icon.svg",
  city: "city-icon.svg",
  exit: "exit-icon.svg",
  preview: "preview-icon.svg",
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
  return <img className={className} src={`src/assets/${fileName}`} alt={alt} />;
};

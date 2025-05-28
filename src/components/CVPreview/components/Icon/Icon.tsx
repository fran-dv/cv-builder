interface IconsFiles {
  email: string;
  phone: string;
  city: string;
}

const IconsFileNames: IconsFiles = {
  email: "email-icon.svg",
  phone: "phone-icon.svg",
  city: "city-icon.svg",
} as const;

type IconsTypes = keyof IconsFiles;

interface Props {
  type: IconsTypes;
  className?: string;
}

export const Icon = ({ type, className = "icon" }: Props) => {
  const fileName = IconsFileNames[type];
  const alt = `${type[0].toUpperCase() + type.slice(1)} icon`;
  return <img className={className} src={`src/assets/${fileName}`} alt={alt} />;
};

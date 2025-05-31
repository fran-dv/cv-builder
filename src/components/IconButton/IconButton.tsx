import { Icon, type IconsTypes } from "@/components";
import "./IconButton.css";

interface Props {
  onClick?: () => void;
  type: IconsTypes;
  className?: string;
  title?: string;
}

export const IconButton = ({ onClick, type, className, title }: Props) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      title={title}
    >
      <Icon type={type} className="icon"></Icon>
    </button>
  );
};

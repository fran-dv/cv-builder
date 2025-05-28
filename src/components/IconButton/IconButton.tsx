import { Icon, type IconsTypes } from "@/components";
import "./IconButton.css";

interface Props {
  onClick?: () => void;
  type: IconsTypes;
  className?: string;
}

export const IconButton = ({ onClick, type, className }: Props) => {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <Icon type={type} className="icon"></Icon>
    </button>
  );
};

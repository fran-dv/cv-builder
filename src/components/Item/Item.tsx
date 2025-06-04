import { IconButton } from "@/components";

interface Props {
  id: string;
  deleteCallback: () => void;
  title?: string;
  subtitle?: string;
  startDate?: string;
  finishDate?: string;
  place?: string;
  description?: string;
}

export const Item = ({
  id,
  deleteCallback,
  title,
  subtitle,
  startDate,
  finishDate,
  place,
  description,
}: Props) => {
  return (
    <div key={id} className="item-container">
      <IconButton
        type="delete"
        onClick={deleteCallback}
        className="delete-item"
      />
      <div className="item-title">
        <h2>{title}</h2>
        <p>at {subtitle}</p>
      </div>
      <div className="item-dates-place">
        <p>
          {startDate} - {finishDate}
        </p>
        <p className="place">{place}</p>
      </div>
      <div className="item-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

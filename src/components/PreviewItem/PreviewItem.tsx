interface Props {
  title?: string;
  subtitle?: string;
  startDate?: string;
  finishDate?: string;
  place?: string;
  description?: string;
}

export const PreviewItem = ({
  title,
  subtitle,
  startDate,
  finishDate,
  place,
  description,
}: Props) => {
  return (
    <div className="section-item">
      <div className="item-heading">
        <div className="item-title">
          <h4>{title}</h4>
          <p>{subtitle ? `at ${subtitle}` : ""}</p>
        </div>

        <div className="item-place-dates">
          <p>
            {startDate ? `${startDate} - ` : ""} {finishDate}
          </p>
          <p className="item-place">{place}</p>
        </div>
      </div>

      <p>{description}</p>
    </div>
  );
};

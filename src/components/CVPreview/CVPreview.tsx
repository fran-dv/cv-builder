import type { PersonalInfo, SummaryInfo } from "@/models";
import "./CVPreview.css";
import { Icon } from "@/components";

interface Props {
  personalInfo: PersonalInfo;
  summaryInfo: SummaryInfo;
}

interface CVSectionProps {
  title: string;
  children: React.ReactNode;
}

const CVSection = ({ title, children }: CVSectionProps) => {
  return (
    <div className="cv-section">
      <h2>{title}</h2>
      <div className="divisor"></div>
      {children}
    </div>
  );
};

export const CVPreview = ({
  personalInfo: { name, jobTitle, email, phone, city },
  summaryInfo: { summary },
}: Props) => {
  return (
    <div className="cv-preview">
      {name && <h2 className="name">{name}</h2>}
      {jobTitle && <h4 className="job-title">{jobTitle}</h4>}
      <ul className="contact-list">
        {email && (
          <li>
            <Icon type="email" />
            <p>{email}</p>
          </li>
        )}
        {phone && (
          <li>
            <Icon type="phone" />
            <p>{phone}</p>
          </li>
        )}
        {city && (
          <li>
            <Icon type="city" />
            <p>{city}</p>
          </li>
        )}
      </ul>
      {summary && (
        <CVSection title="Summary">
          <p>{summary}</p>
        </CVSection>
      )}
    </div>
  );
};

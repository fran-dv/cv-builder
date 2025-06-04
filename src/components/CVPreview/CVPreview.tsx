import type { ExperienceInfo, PersonalInfo, SummaryInfo } from "@/models";
import "./CVPreview.css";
import { Icon } from "@/components";

interface Props {
  personalInfo: PersonalInfo;
  summaryInfo: SummaryInfo;
  experienceInfo1: ExperienceInfo;
  experienceInfo2: ExperienceInfo;
  experienceInfo3: ExperienceInfo;
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
  experienceInfo1,
  experienceInfo2,
  experienceInfo3,
}: Props) => {
  const experiences = [
    experienceInfo1,
    experienceInfo2,
    experienceInfo3,
  ].filter(
    (exp) =>
      exp &&
      (exp.jobTitle ||
        exp.employer ||
        exp.startDate ||
        exp.finishDate ||
        exp.city ||
        exp.description),
  );
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

      {experiences.length > 0 && (
        <CVSection title="Experiences">
          {[experienceInfo1, experienceInfo2, experienceInfo3].map(
            (experience, index) => {
              if (!experience) return null;

              return (
                <div key={`experience${index}`} className="section-item">
                  <div className="item-heading">
                    <div className="item-title">
                      <h4>{experience.jobTitle}</h4>
                      <p>
                        {experience.employer ? `at ${experience.employer}` : ""}
                      </p>
                    </div>

                    <div className="item-place-dates">
                      <p>
                        {experience.startDate
                          ? `${experience.startDate} - `
                          : ""}{" "}
                        {experience.finishDate}
                      </p>
                      <p className="item-place">{experience.city}</p>
                    </div>
                  </div>

                  <p>{experience.description}</p>
                </div>
              );
            },
          )}
        </CVSection>
      )}
    </div>
  );
};

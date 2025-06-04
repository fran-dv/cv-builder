import type {
  EducationInfo,
  ExperienceInfo,
  PersonalInfo,
  SummaryInfo,
} from "@/models";
import "./CVPreview.css";
import { Icon, PreviewItem } from "@/components";
import { Fragment } from "react/jsx-runtime";

interface Props {
  personalInfo: PersonalInfo;
  summaryInfo: SummaryInfo;
  experienceInfo1: ExperienceInfo;
  experienceInfo2: ExperienceInfo;
  experienceInfo3: ExperienceInfo;
  educationInfo1: EducationInfo;
  educationInfo2: EducationInfo;
  educationInfo3: EducationInfo;
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
  educationInfo1,
  educationInfo2,
  educationInfo3,
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
  const educationItems = [
    educationInfo1,
    educationInfo2,
    educationInfo3,
  ].filter(
    (exp) =>
      exp &&
      (exp.degree ||
        exp.school ||
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
          <p className="summary-text">{summary}</p>
        </CVSection>
      )}

      {experiences.length > 0 && (
        <CVSection title="Experiences">
          {[experienceInfo1, experienceInfo2, experienceInfo3].map(
            (experience, index) => {
              if (!experience) return null;

              const uniqueKey = `experience-${index}-${self.crypto.randomUUID()}`;
              return (
                <Fragment key={uniqueKey}>
                  <PreviewItem
                    title={experience.jobTitle}
                    subtitle={experience.employer}
                    startDate={experience.startDate}
                    finishDate={experience.finishDate}
                    place={experience.city}
                    description={experience.description}
                  />
                </Fragment>
              );
            },
          )}
        </CVSection>
      )}
      {educationItems.length > 0 && (
        <CVSection title="Education">
          {[educationInfo1, educationInfo2, educationInfo3].map(
            (education, index) => {
              if (!education) return null;

              const uniqueKey = `experience-${index}-${self.crypto.randomUUID()}`;
              return (
                <Fragment key={uniqueKey}>
                  <PreviewItem
                    title={education.degree}
                    subtitle={education.school}
                    startDate={education.startDate}
                    finishDate={education.finishDate}
                    place={education.city}
                    description={education.description}
                  />
                </Fragment>
              );
            },
          )}
        </CVSection>
      )}
    </div>
  );
};

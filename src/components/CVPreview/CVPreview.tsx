import type { PersonalInfo } from "@/models";
import "./CVPreview.css";
import { Icon } from "./components";

interface Props {
  personalInfo: PersonalInfo;
}

export const CVPreview = ({
  personalInfo: { name, jobTitle, email, phone, city },
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
    </div>
  );
};

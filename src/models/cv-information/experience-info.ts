export interface ExperienceInfo {
  jobTitle?: string;
  city?: string;
  employer?: string;
  startDate?: string;
  finishDate?: string;
  description?: string;
}

export const isExperienceInfo = (x: unknown): x is ExperienceInfo => {
  if (typeof x !== "object" || x === null) {
    return false;
  }
  const obj = x as Record<string, unknown>;

  if (
    "jobTitle" in obj &&
    obj.jobTitle !== undefined &&
    typeof obj.jobTitle !== "string"
  ) {
    return false;
  }

  if ("city" in obj && obj.city !== undefined && typeof obj.city !== "string") {
    return false;
  }

  if (
    "employer" in obj &&
    obj.employer !== undefined &&
    typeof obj.employer !== "string"
  ) {
    return false;
  }

  if (
    "startDate" in obj &&
    obj.startDate !== undefined &&
    typeof obj.startDate !== "string"
  ) {
    return false;
  }

  if (
    "finishDate" in obj &&
    obj.finishDate !== undefined &&
    typeof obj.finishDate !== "string"
  ) {
    return false;
  }

  if (
    "description" in obj &&
    obj.description !== undefined &&
    typeof obj.description !== "string"
  ) {
    return false;
  }

  return true;
};

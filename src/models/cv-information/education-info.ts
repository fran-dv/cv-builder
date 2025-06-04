export interface EducationInfo {
  degree?: string;
  school?: string;
  city?: string;
  startDate?: string;
  finishDate?: string;
  description?: string;
}

export const isEducationInfo = (x: unknown): x is EducationInfo => {
  if (typeof x !== "object" || x === null) {
    return false;
  }
  const obj = x as Record<string, unknown>;

  if (
    "degree" in obj &&
    obj.degree !== undefined &&
    typeof obj.degree !== "string"
  ) {
    return false;
  }

  if ("city" in obj && obj.city !== undefined && typeof obj.city !== "string") {
    return false;
  }

  if (
    "school" in obj &&
    obj.school !== undefined &&
    typeof obj.school !== "string"
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

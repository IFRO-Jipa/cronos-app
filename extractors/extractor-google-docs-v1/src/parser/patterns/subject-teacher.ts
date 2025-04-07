const separatorPattern = "-";

export const isValidSubjectTeacher = (label: string) => {
  if (typeof label !== "string") return false;

  if (label === separatorPattern) {
    return false;
  }

  if (label.startsWith(separatorPattern) || label.endsWith(separatorPattern)) {
    return false;
  }

  return true;
};
export const parseSubjectTeacher = (label: string) => {
  if (!isValidSubjectTeacher(label))
    throw new Error("invalid subject teacher label");

  const separatorIndex = label.lastIndexOf(separatorPattern);

  const [subjectSlug, teacherSlug] = [
    label.slice(0, separatorIndex).trim(),
    label.slice(separatorIndex + separatorPattern.length).trim(),
  ];

  return {
    subjectSlug,
    teacherSlug,
  };
};

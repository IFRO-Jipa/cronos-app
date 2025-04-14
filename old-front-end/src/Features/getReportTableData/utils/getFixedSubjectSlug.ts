import { SUBJECT_SLUG_FIXTURES } from "./SUBJECT_SLUG_FIXTURES";

export const getFixedSubjectSlug = (slug: string) =>
  SUBJECT_SLUG_FIXTURES[slug] ?? slug;

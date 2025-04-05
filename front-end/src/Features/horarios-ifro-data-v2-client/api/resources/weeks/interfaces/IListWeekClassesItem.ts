export type IListWeekClassesItem = {
  id: string;

  year: string;

  course: string;

  label: string;

  slugs: { id: number; slug: string }[];
};

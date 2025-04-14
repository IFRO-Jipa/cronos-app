import { IListWeekClassesItem } from "./IListWeekClassesItem";

export type IGetWeekTeacherItemsItem = {
  id: number;

  order: number;

  klass: null | IListWeekClassesItem;

  subject: null | {
    id: string;
    name: null | string;
    slugs: { id: number; slug: string }[];
  };

  weekDayOrder: number;

  absoluteDay: number;
};

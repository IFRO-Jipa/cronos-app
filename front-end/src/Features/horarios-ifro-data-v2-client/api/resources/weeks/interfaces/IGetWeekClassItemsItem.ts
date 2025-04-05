import { IListWeekTeachersItem } from "./IListWeekTeachersItem";

export type IGetWeekClassItemsItem = {
  id: number;

  order: number;

  teacher: null | IListWeekTeachersItem;

  subject: null | {
    id: string;
    name: null | string;
    slugs: { id: number; slug: string }[];
  };

  weekDayOrder: number;

  absoluteDay: number;
};

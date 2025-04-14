import { IGetWeekTeacherItemsItem } from "./IGetWeekTeacherItemsItem";
import { IListWeekTeachersItem } from "./IListWeekTeachersItem";
import { IListWeeksItem } from "./IListWeeksItem";

export type IGetWeekTeacherResourceResponseDto = {
  week: IListWeeksItem;

  teacher: IListWeekTeachersItem;

  items: IGetWeekTeacherItemsItem[];
};

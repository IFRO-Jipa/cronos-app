import { IGetWeekClassItemsItem } from "./IGetWeekClassItemsItem";
import { IListWeekClassesItem } from "./IListWeekClassesItem";
import { IListWeeksItem } from "./IListWeeksItem";

export type IGetWeekClassResourceResponseDto = {
  week: IListWeeksItem;

  klass: IListWeekClassesItem;

  items: IGetWeekClassItemsItem[];
};

import { IGetWeekClassItemsItem } from "./IGetWeekClassItemsItem";
import { IGetWeekTeacherItemsItem } from "./IGetWeekTeacherItemsItem";

export type IGetWeekItemsItem =
  | IGetWeekClassItemsItem
  | IGetWeekTeacherItemsItem;

import { IGetWeekTeacherItemsItem } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherItemsItem";
import { IGetWeekClassItemsItem } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassItemsItem";

export type IWeekItemViewItem =
  | IGetWeekTeacherItemsItem
  | IGetWeekClassItemsItem;

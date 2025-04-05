import { IListWeekClassesItem } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeekClassesItem";

export type IPageAdvancedElementsListItemClass = {
  type: "class";
  id: string;
  data: IListWeekClassesItem;
};

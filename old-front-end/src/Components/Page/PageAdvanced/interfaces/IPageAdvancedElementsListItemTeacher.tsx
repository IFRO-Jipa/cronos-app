import { IListWeekTeachersItem } from "../../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeekTeachersItem";

export type IPageAdvancedElementsListItemTeacher = {
  type: "teacher";
  id: string;
  data: IListWeekTeachersItem;
};

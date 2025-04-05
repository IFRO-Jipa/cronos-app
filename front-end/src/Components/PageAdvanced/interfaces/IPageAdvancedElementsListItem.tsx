import { IPageAdvancedElementsListItemClass } from "./IPageAdvancedElementsListItemClass";
import { IPageAdvancedElementsListItemTeacher } from "./IPageAdvancedElementsListItemTeacher";

export type IPageAdvancedElementsListItem =
  | IPageAdvancedElementsListItemTeacher
  | IPageAdvancedElementsListItemClass;

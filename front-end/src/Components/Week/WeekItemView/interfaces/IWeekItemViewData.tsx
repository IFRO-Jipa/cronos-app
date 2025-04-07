import { IGetWeekClassResourceResponseDto } from "../../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { IGetWeekTeacherResourceResponseDto } from "../../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";

export type IWeekItemViewData =
  | IGetWeekClassResourceResponseDto
  | IGetWeekTeacherResourceResponseDto;

import { IGetWeekTeacherResourceResponseDto } from "./interfaces/IGetWeekTeacherResourceResponseDto";
import { IAPIResource } from "../../interfaces/IAPIResource";

export const getWeekTeacherResource: IAPIResource<
  { weekId: string; teacherId: string },
  IGetWeekTeacherResourceResponseDto
> =
  (httpClient) =>
  ({ weekId, teacherId }) => {
    return httpClient({
      url: `/views/weeks/${weekId}/teachers/${teacherId}/data.json`,
    }).then((res) => res.json());
  };

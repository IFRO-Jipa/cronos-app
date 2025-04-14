import { IGetWeekClassResourceResponseDto } from "./interfaces/IGetWeekClassResourceResponseDto";
import { IAPIResource } from "../../interfaces/IAPIResource";

export const getWeekClassResource: IAPIResource<
  { weekId: string; classId: string },
  IGetWeekClassResourceResponseDto
> =
  (httpClient) =>
  ({ weekId, classId }) => {
    return httpClient({
      url: `/views/weeks/${weekId}/classes/${classId}/data.json`,
    }).then((res) => res.json());
  };

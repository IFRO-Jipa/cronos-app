import { IListWeekTeachersResourceResponseDto } from "./interfaces/IListWeekTeachersResourceResponseDto";
import { IAPIResource } from "../../interfaces/IAPIResource";

export const listWeekTeachersResource: IAPIResource<
  { weekId: string },
  IListWeekTeachersResourceResponseDto
> =
  (httpClient) =>
  ({ weekId }) => {
    return httpClient({ url: `/views/weeks/${weekId}/teachers/data.json` })
      .then((res) => res.json())
      .then((res: IListWeekTeachersResourceResponseDto) =>
        res.filter((teacher) => teacher.slugs[0].slug.length)
      );
  };

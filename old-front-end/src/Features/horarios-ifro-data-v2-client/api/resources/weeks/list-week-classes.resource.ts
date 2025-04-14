import { IListWeekClassesResourceResponseDto } from "./interfaces/IListWeekClassesResourceResponseDto";
import { IAPIResource } from "../../interfaces/IAPIResource";

export const listWeekClassesResource: IAPIResource<
  { weekId: string },
  IListWeekClassesResourceResponseDto
> =
  (httpClient) =>
  ({ weekId }) => {
    return httpClient({ url: `/views/weeks/${weekId}/classes/data.json` }).then(
      (res) => res.json(),
    );
  };

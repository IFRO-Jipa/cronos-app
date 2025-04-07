import { IListWeeksResourceResponseDto } from "./interfaces/IListWeeksResourceResponseDto";
import { IAPIResource } from "../../interfaces/IAPIResource";
import { IListWeeksItem } from "./interfaces/IListWeeksItem";

export const getWeekResource: IAPIResource<
  { weekId: string },
  IListWeeksItem | null
> =
  (httpClient) =>
  ({ weekId }) => {
    return httpClient({ url: "/views/weeks.json" })
      .then((res) => res.json())
      .then(
        (res: IListWeeksResourceResponseDto) =>
          res.find((i) => i.id === weekId) ?? null,
      );
  };

import { IListWeeksResourceResponseDto } from "./interfaces/IListWeeksResourceResponseDto";
import { IAPIResource } from "../../interfaces/IAPIResource";

export const listWeeksResource: IAPIResource<
  undefined,
  IListWeeksResourceResponseDto
> = (httpClient) => () => {
  return httpClient({ url: "/views/weeks.json" })
    .then((res) => res.json())
    .then((res: IListWeeksResourceResponseDto) =>
      res.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
      ),
    );
};

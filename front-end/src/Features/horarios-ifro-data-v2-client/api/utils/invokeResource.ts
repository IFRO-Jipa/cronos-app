import { IAPIResource } from "../interfaces/IAPIResource";
import { httpClient } from "./httpClient";

export const invokeResource = async <RequestDto = undefined, ResponseDto = any>(
  resource: IAPIResource<RequestDto, ResponseDto>,
  requestDto: RequestDto,
) => {
  return await resource(httpClient)(requestDto);
};

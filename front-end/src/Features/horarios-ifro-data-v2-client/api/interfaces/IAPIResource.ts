import { IHTTPClient } from "./IHTTPClient";

export type IAPIResource<RequestDto = undefined, ResponseDto = any> = (
  httpClient: IHTTPClient,
) => (requestDto: RequestDto) => Promise<ResponseDto>;

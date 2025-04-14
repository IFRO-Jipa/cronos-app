import { IHTTPClient } from "../interfaces/IHTTPClient";
import { DATA_V2_ENDPOINT } from "./DATA_V2_ENDPOINT";
import { getHTTPClient } from "./getHTTPClient";

export const httpClient: IHTTPClient = getHTTPClient(DATA_V2_ENDPOINT);

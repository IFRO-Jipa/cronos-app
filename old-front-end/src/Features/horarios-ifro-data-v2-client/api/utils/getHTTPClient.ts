import { IHTTPClient } from "../interfaces/IHTTPClient";

export const getHTTPClient =
  (endpointURL: string): IHTTPClient =>
  ({ url, options }) => {
    return fetch(`${endpointURL}${url}`, options);
  };

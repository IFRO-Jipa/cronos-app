export type IHTTPClient = (options: {
  url: string;
  options?: RequestInit;
}) => Promise<Response>;

import { UseQueryResult } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { IGetWeekClassResourceResponseDto } from "../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { WeekItemViewContextProvider } from "../WeekItemView/WeekItemViewContext";
import { usePageClassWeekClassQuery } from "./utils/usePageClassWeekClassQuery";

export type IPageClassContext = {
  dataQuery: UseQueryResult<IGetWeekClassResourceResponseDto | null, unknown>;
};

export const PageClassContext = createContext({} as IPageClassContext);

type IPageClassContextProviderProps = PropsWithChildren<{}>;

export const PageClassContextProvider: FC<IPageClassContextProviderProps> = ({
  children,
}) => {
  const dataQuery = usePageClassWeekClassQuery();

  return (
    <>
      <WeekItemViewContextProvider mode={"class"} dataQuery={dataQuery}>
        <PageClassContext.Provider
          value={{
            dataQuery,
          }}
        >
          {children}
        </PageClassContext.Provider>
      </WeekItemViewContextProvider>
    </>
  );
};

import { UseQueryResult } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { IGetWeekTeacherResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekTeacherResourceResponseDto";
import { WeekItemViewContextProvider } from "../../Week/WeekItemView/WeekItemViewContext";
import { usePageTeacherWeekTeacherQuery } from "./utils/usePageTeacherWeekTeacherQuery";

export type IPageTeacherContext = {
  dataQuery: UseQueryResult<IGetWeekTeacherResourceResponseDto | null, unknown>;
};

export const PageTeacherContext = createContext({} as IPageTeacherContext);

type IPageTeacherContextProviderProps = PropsWithChildren<{}>;

export const PageTeacherContextProvider: FC<
  IPageTeacherContextProviderProps
> = ({ children }) => {
  const dataQuery = usePageTeacherWeekTeacherQuery();

  return (
    <>
      <WeekItemViewContextProvider mode={"teacher"} dataQuery={dataQuery}>
        <PageTeacherContext.Provider value={{ dataQuery }}>
          {children}
        </PageTeacherContext.Provider>
      </WeekItemViewContextProvider>
    </>
  );
};

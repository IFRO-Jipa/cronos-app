import { UseQueryResult } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { IWeekItemViewData } from "./interfaces/IWeekItemViewData";

export type IWeekItemViewContext = {
  mode: "class" | "teacher";

  dataQuery: UseQueryResult<IWeekItemViewData | null, unknown>;
};

export const WeekItemViewContext = createContext({} as IWeekItemViewContext);

type IWeekItemViewContextProviderProps = PropsWithChildren<
  Pick<IWeekItemViewContext, "dataQuery" | "mode">
>;

export const WeekItemViewContextProvider: FC<
  IWeekItemViewContextProviderProps
> = (props) => {
  const { children, dataQuery, mode } = props;

  return (
    <WeekItemViewContext.Provider
      value={{
        mode,
        dataQuery,
      }}
    >
      {children}
    </WeekItemViewContext.Provider>
  );
};

import Box from "@mui/material/Box";
import { FC, PropsWithChildren, RefObject } from "react";
import { createContext } from "use-context-selector";
import { useReportTableData } from "../WeekItemView/utils/useReportTableData";
import { useWeekItemViewOverviewState } from "./useWeekItemViewOverviewState";

export type IWeekItemViewOverviewContext = {
  imgURL: string | null;

  outputElRef: RefObject<HTMLElement | null>;

  handleGenerateImgURL: () => Promise<void>;

  generateImageBlob: () => Promise<Blob | null>;
};

export const WeekItemViewOverviewContext = createContext(
  {} as IWeekItemViewOverviewContext,
);

type IWeekItemViewOverviewContextProviderProps = PropsWithChildren<{}>;

export const WeekItemViewOverviewContextProvider: FC<
  IWeekItemViewOverviewContextProviderProps
> = ({ children }) => {
  const reportTableData = useReportTableData();

  const { imgURL, outputElRef, handleGenerateImgURL, generateImageBlob } =
    useWeekItemViewOverviewState(reportTableData);

  return (
    <>
      <WeekItemViewOverviewContext.Provider
        value={{ imgURL, outputElRef, handleGenerateImgURL, generateImageBlob }}
      >
        {children}

        <Box sx={{ visibility: "hidden", position: "absolute" }}>
          <Box ref={outputElRef} />
        </Box>
      </WeekItemViewOverviewContext.Provider>
    </>
  );
};

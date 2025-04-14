import { FC, PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import { usePageItemReportDialogState } from "./usePageItemReportDialogState";

export type IPageItemReportContext = {
  open: boolean;

  handleClose: () => void;
};

export const PageItemReportContext = createContext(
  {} as IPageItemReportContext,
);

type IPageClassReportContextProviderProps = PropsWithChildren<{
  reportPath: string;
}>;

export const PageItemReportContextProvider: FC<
  IPageClassReportContextProviderProps
> = ({ children, reportPath }) => {
  const { open, handleClose } = usePageItemReportDialogState(reportPath);

  return (
    <>
      <PageItemReportContext.Provider value={{ open, handleClose }}>
        {children}
      </PageItemReportContext.Provider>
    </>
  );
};

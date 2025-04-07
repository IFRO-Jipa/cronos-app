import { PageItemReportContext } from "./PageItemReportContext";
import { useContextSelector } from "use-context-selector";
import { PageItemReportDialogContentClosedView } from "./PageItemReportDialogContentClosedView";
import loadable from "@loadable/component";

const PageItemReportDialogContentOpenedView = loadable(
  () => import("./PageItemReportDialogContentOpenedView")
);

export const PageItemReportDialogContent = () => {
  const open = useContextSelector(PageItemReportContext, ({ open }) => open);

  if (!open) {
    return <PageItemReportDialogContentClosedView />;
  }

  return <PageItemReportDialogContentOpenedView />;
};

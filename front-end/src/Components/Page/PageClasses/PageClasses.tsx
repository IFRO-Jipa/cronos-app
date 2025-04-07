import { AppContent } from "../../App/AppContent/AppContent";
import PageClassesHeader from "./PageClassesHeader";
import PageClassesContent from "./PageClassesContent";
import { PageClassesContextProvider } from "./PageClassesContext";

const PageClasses = () => (
  <PageClassesContextProvider>
    <PageClassesHeader />

    <AppContent>
      <PageClassesContent />
    </AppContent>
  </PageClassesContextProvider>
);

export default PageClasses;

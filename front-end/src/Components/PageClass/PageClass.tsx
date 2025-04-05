import loadable from "@loadable/component";
import { AppContent } from "../AppContent/AppContent";
import Footer from "../Footer/Footer";
import PageClassContent from "./PageClassContent";
import { PageClassContextProvider } from "./PageClassContext";
import PageClassHeader from "./PageClassHeader";

const PageClassReport = loadable(() => import("./PageClassReport"));

const PageClass = () => (
  <PageClassContextProvider>
    <PageClassHeader />

    <PageClassReport />

    <AppContent>
      <PageClassContent />
    </AppContent>

    <Footer containerProps={{ maxWidth: "sm" }} />
  </PageClassContextProvider>
);

export default PageClass;

import { AppContent } from "../AppContent/AppContent";
import PageHomeContent from "./PageHomeContent";
import PageHomeHeader from "./PageHomeHeader";
import PageHomeFooter from "./PageHomeFooter";

const PageHome = () => (
  <>
    <PageHomeHeader />

    <AppContent>
      <PageHomeContent />
    </AppContent>

    <PageHomeFooter />
  </>
);

export default PageHome;

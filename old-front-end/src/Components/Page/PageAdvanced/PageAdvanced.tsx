import { PageAdvancedContextProvider } from "./PageAdvancedContext";
import PageAdvancedContent from "./PageAdvancedContent";
import PageAdvancedHeader from "./PageAdvancedHeader";
import Footer from "../../Layout/Footer/Footer";

const PageAdvanced = () => (
  <>
    <PageAdvancedContextProvider>
      <PageAdvancedHeader />

      <PageAdvancedContent />

      <Footer />
    </PageAdvancedContextProvider>
  </>
);

export default PageAdvanced;

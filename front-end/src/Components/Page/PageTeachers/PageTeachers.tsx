import { AppContent } from "../../App/AppContent/AppContent";
import Footer from "../../Layout/Footer/Footer";
import PageTeachersContent from "./PageTeachersContent";
import { PageTeachersContextProvider } from "./PageTeachersContext";
import PageTeachersHeader from "./PageTeachersHeader";

const PageTeachers = () => (
  <PageTeachersContextProvider>
    <PageTeachersHeader />

    <AppContent>
      <PageTeachersContent />
    </AppContent>

    <Footer containerProps={{ maxWidth: "sm" }} />
  </PageTeachersContextProvider>
);

export default PageTeachers;

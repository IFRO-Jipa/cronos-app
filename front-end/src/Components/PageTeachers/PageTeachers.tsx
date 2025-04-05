import { AppContent } from "../AppContent/AppContent";
import Footer from "../Footer/Footer";
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

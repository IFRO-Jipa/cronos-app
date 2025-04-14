import { AppContent } from "../../App/AppContent/AppContent";
import { PageTeacherContextProvider } from "./PageTeacherContext";
import PageTeacherContent from "./PageTeacherContent";
import PageTeacherHeader from "./PageTeacherHeader";
import loadable from "@loadable/component";
import { PageTeacherFixtureIdMappings } from "./PageTeacherFixtureIdMappings";
import Footer from "../../Layout/Footer/Footer";

const PageTeacherReport = loadable(() => import("./PageTeacherReport"));

const PageTeacher = () => (
  <PageTeacherFixtureIdMappings>
    <PageTeacherContextProvider>
      <PageTeacherHeader />

      <PageTeacherReport />

      <AppContent>
        <PageTeacherContent />
      </AppContent>

      <Footer containerProps={{ maxWidth: "sm" }} />
    </PageTeacherContextProvider>
  </PageTeacherFixtureIdMappings>
);

export default PageTeacher;

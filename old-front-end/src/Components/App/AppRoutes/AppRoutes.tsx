import PageHome from "../../Page/PageHome/PageHome";
import { Route, Routes } from "react-router-dom";
import { lazy } from "@loadable/component";
import { Suspense } from "react";
import PageLoading from "../../Page/PageLoading/PageLoading";
import { LegacyCoursesPage } from "./LegacyCoursesPage";
import { LegacyTeachersPage } from "./LegacyTeachersPage";

const PageClasses = lazy(() => import("../../Page/PageClasses/PageClasses"));

const PageClass = lazy(() => import("../../Page/PageClass/PageClass"));

const PageTeachers = lazy(() => import("../../Page/PageTeachers/PageTeachers"));

const PageTeacher = lazy(() => import("../../Page/PageTeacher/PageTeacher"));

const PageAdvanced = lazy(() => import("../../Page/PageAdvanced/PageAdvanced"));

const AppRoutes = () => (
  <>
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* legacy routes */}

        <Route path="courses">
          <Route path=":course" element={<LegacyCoursesPage />} />
          <Route path=":course/:year" element={<LegacyCoursesPage />} />
          <Route path=":course/:year/:label" element={<LegacyCoursesPage />} />
          <Route path="" element={<LegacyCoursesPage />} />
        </Route>

        <Route path="teachers/search" element={<LegacyTeachersPage />} />

        {/* end legacy routes */}

        <Route path={"/classes"} element={<PageClasses />} />

        <Route path={"/classes/:classId"}>
          <Route path="" element={<PageClass />} />
          <Route path="report" element={<PageClass />} />
        </Route>

        <Route path={"/teachers"} element={<PageTeachers />} />

        <Route path={"/teachers/:teacherId"}>
          <Route path="" element={<PageTeacher />} />
          <Route path="report" element={<PageTeacher />} />
        </Route>

        <Route path={"/advanced"} element={<PageAdvanced />} />

        <Route path={"/"} element={<PageHome />} />
      </Routes>
    </Suspense>
  </>
);

export default AppRoutes;

import loadable from "@loadable/component";

const WeekItemView = loadable(() => import("../WeekItemView/WeekItemView"));

const PageClassContent = () => {
  return (
    <>
      <WeekItemView />
    </>
  );
};

export default PageClassContent;

import loadable from "@loadable/component";

const WeekItemView = loadable(() => import("../../Week/WeekItemView/WeekItemView"));

const PageClassContent = () => {
  return (
    <>
      <WeekItemView />
    </>
  );
};

export default PageClassContent;

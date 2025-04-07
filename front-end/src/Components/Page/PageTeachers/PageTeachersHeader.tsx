import { Header } from "../../Layout/Header/Header";

const PageTeachersHeader = () => (
  <>
    <Header
      goBackTo={"/"}
      title="Professores"
      containerProps={{ maxWidth: "sm" }}
    />
  </>
);

export default PageTeachersHeader;

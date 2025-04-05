import { Header } from "../Header/Header";

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

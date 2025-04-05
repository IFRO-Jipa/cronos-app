import { Header } from "../Header/Header";
import { AppContent } from "../AppContent/AppContent";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";

const PageLoading = () => (
  <>
    <Header
      containerProps={{ maxWidth: "sm" }}
      goBackTo={"/"}
      title="Carregando..."
    />

    <AppContent>
      <Loading />
    </AppContent>

    <Footer containerProps={{ maxWidth: "sm" }} />
  </>
);

export default PageLoading;

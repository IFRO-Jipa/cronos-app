import { Header } from "../../Layout/Header/Header";
import { AppContent } from "../../App/AppContent/AppContent";
import Loading from "../../Page/Loading/Loading";
import Footer from "../../Layout/Footer/Footer";

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

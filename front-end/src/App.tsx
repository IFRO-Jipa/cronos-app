import AppRoutes from "./Components/AppRoutes/AppRoutes";
import "./App.css";
import { useRestoreLastRoute } from "./useRestoreLastRoute";

const App = () => {
  useRestoreLastRoute();

  return (
    <div className={"app"}>
      <AppRoutes />
    </div>
  );
};

export default App;

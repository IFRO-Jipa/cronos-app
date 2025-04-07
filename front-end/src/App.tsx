import AppRoutes from "./Components/App/AppRoutes/AppRoutes";
import "./App.css";
import { useRestoreLastRoute } from "./useRestoreLastRoute";

const App = () => {
  useRestoreLastRoute();

  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
};

export default App;

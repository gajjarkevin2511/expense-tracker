import { ToastContainer } from "react-toastify";
import { StoreProvider } from "./store/StoreProvider";
import AppRoutes from "./app/pages/AppRoutes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </StoreProvider>
  );
}

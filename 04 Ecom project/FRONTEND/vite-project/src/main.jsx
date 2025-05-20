import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FetchData from "./context/FetchData.jsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store.js";
import WishListContextList from "./context/wishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <FetchData>
        <WishListContextList>
        <ToastContainer position="top-center" />
        <App />
        </WishListContextList>
      </FetchData>
    </Provider>
  </BrowserRouter>
);

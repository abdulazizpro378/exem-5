import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainProvider } from "./hooks/MainContext.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";

// QueryClient'ni yaratish
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <MainProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </MainProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

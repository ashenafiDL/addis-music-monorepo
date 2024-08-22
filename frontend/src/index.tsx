import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Albums from "./routes/albums";
import Artists from "./routes/artists";
import Genres from "./routes/genres";
import Songs from "./routes/songs";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/songs",
        element: <Songs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/artists",
        element: <Artists />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/albums",
        element: <Albums />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/genres",
        element: <Genres />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

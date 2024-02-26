import { ThemeProvider, createTheme } from "@mui/material";
import Login from "./components/auth/Login";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SitesPage from "./site/SitesPage";
import Register from "./components/auth/Register";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#65a282",
      main: "#53846b",
      dark: "#3a664f",
      contrastText: "#032915",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <SitesPage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/system/Container";
import { useState, useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponents";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  },[dispatch])
  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  //! when onchange happens just switch opposite value
  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  if (loading) return <LoadingComponent message="Initializing app..." />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      />
      <CssBaseline />
      <Header
        darkMode={darkMode}
        handleThemeChange={handleThemeChange}
      />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;

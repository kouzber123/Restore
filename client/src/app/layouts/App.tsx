import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/system/Container";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Header from "./Header";

import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponents";
import { Outlet } from "react-router-dom";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");

    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

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
        default: paletteType === "light" ? "#eaeaea" : "#121212"
      }
    }
  });

  if (loading) return <LoadingComponent message="Initializing app..." />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;

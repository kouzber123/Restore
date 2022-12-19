import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/system/Container";
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";

import Header from "./Header";

function App() {
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
  return (
   
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Route exact path={"/"} component={HomePage} />
          <Route exact path={"/catalog"} component={Catalog} />
          <Route path={"/catalog/:id"} component={ProductDetails} />
          <Route path={"/about"} component={AboutPage} />
          <Route path={"/contact"} component={ContactPage} />
        </Container>
      </ThemeProvider>
    
  );
}

export default App;

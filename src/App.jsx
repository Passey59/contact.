import { useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from "./components/layout/navigation";
import Footer from "./components/layout/footer";

import Index from "./pages/index";
import Contacts from "./pages/contacts";
import Imprint from "./pages/imprint";
import Privacy from "./pages/privacy";

function App() {
    // define mode state, default is dark
    const [mode, setMode] = useState("dark");

    // define theme
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    accent: {
                        main: "#20DDB3",
                        light: "#20DDB3",
                        dark: "#20DDB3",
                    },
                },
            }),
        [mode]
    );

    // function to toggle mode
    const toggleMode = () => {
        setMode(mode === "light" ? "dark" : "light");
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Navigation
                    toggleMode={toggleMode}
                    color={theme.palette.mode}
                />
                <Routes>
                    <Route key="index" exact path="/" element={<Index />} />
                    <Route
                        key="contacts"
                        path="/contacts"
                        element={<Contacts />}
                    />
                    <Route
                        key="imprint"
                        path="/imprint"
                        element={<Imprint />}
                    />
                    <Route
                        key="privacy"
                        path="/privacy"
                        element={<Privacy />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

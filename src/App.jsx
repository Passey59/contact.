import { useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";

function App() {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    const toggleMode = () => {
        setMode(mode === "light" ? "dark" : "light");
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Navbar toggleMode={toggleMode} color={theme.palette.mode} />
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

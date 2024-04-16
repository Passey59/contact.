import Lottie from "lottie-react";
import { Container } from "@mui/material";
import { Box } from "@mui/material";

import animationData from "./assets/start-bg.json";

function App() {
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Box sx={{ maxWidth: "30vw" }}>
                    <Lottie animationData={animationData} loop={true} />
                </Box>
            </Container>
        </>
    );
}

export default App;

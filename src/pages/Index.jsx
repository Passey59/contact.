import Lottie from "lottie-react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import animationData from "../assets/start-bg.json";

const Index = () => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "88vh",
            }}
        >
            <Box sx={{ maxWidth: "30vw" }}>
                <Lottie animationData={animationData} loop={true} />
            </Box>
        </Container>
    );
};

export default Index;

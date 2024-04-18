import Lottie from "lottie-react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        maxWidth: {
                            xs: "60vw",
                            md: "40vw",
                            lg: "500px",
                        },
                    }}
                >
                    <Lottie animationData={animationData} loop={true} />
                </Box>
                <Typography
                    sx={{
                        position: "absolute",
                        fontWeight: 900,
                        fontSize: { xs: "20vw", md: "15vw", lg: "200px" },
                    }}
                >
                    "Contact"
                </Typography>
            </Box>
            <Button
                variant="outlined"
                color="accent"
                sx={{ mt: 2 }}
                endIcon={<RocketLaunchIcon />}
                component={RouterLink}
                to="/contacts"
            >
                Go to contacts!
            </Button>
        </Container>
    );
};

export default Index;

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Index = () => {
    return (
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
    );
};

export default Index;

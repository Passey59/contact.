import Container from "@mui/material/Container";

const ContentWrapper = ({ children }) => {
    return <Container sx={{ minHeight: "88vh", pt: 3 }}>{children}</Container>;
};

export default ContentWrapper;

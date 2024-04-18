import Typography from "@mui/material/Typography";

const Headline = ({ title }) => {
    return (
        <Typography
            variant="h1"
            sx={{
                fontWeight: 900,
                color: "#20DDB3",
                mb: 4,
                fontSize: { md: "6rem", xs: "4rem" },
            }}
        >
            {title}
        </Typography>
    );
};

export default Headline;

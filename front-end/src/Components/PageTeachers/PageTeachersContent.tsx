import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { PageTeachersContentResults } from "./PageTeachersContentResults";
import { PageTeachersContentSearchField } from "./PageTeachersContentSearchField";

const PageTeachersContent = () => (
  <>
    <Container maxWidth="sm" sx={{ height: "100%", overflow: "hidden" }}>
      <Box
        py={2}
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box>
          <PageTeachersContentSearchField />
        </Box>
        <Box sx={{ flex: "1", overflow: "hidden" }}>
          <PageTeachersContentResults />
        </Box>
      </Box>
    </Container>
  </>
);

export default PageTeachersContent;

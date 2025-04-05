import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AppContainer from "../AppContainer/AppContainer";
import * as styles from "./PageHome.module.css";
import { PAGE_HOME_ACTIONS } from "./utils/PAGE_HOME_ACTIONS";

const PageHomeContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppContainer>
        <Box py={3} className={styles.actions}>
          {PAGE_HOME_ACTIONS.map((action) => (
            <Fragment key={action.label}>
              <Paper variant="outlined">
                <Button
                  onClick={() => navigate(action.href)}
                  disableRipple
                  sx={{
                    width: "100%",
                    height: "100%",
                    color: "#444444",
                    textTransform: "none",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box>{action.icon}</Box>

                    <Box my={0.5}></Box>

                    <Typography variant={"h5"}>{action.label}</Typography>
                  </Box>
                </Button>
              </Paper>
            </Fragment>
          ))}
        </Box>
      </AppContainer>
    </>
  );
};

export default PageHomeContent;

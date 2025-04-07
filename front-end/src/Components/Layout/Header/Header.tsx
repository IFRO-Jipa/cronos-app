import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container, { ContainerProps } from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC } from "react";

type IHeaderProps = {
  title: string;

  goBackTo?: any;

  afterTitle?: any;

  containerProps?: ContainerProps;
};

export const Header: FC<IHeaderProps> = (props) => {
  const { afterTitle, title, goBackTo, containerProps } = props;

  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: "100%" }}>
          <Container
            {...containerProps}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 !important",
              ...containerProps?.sx,
            }}
          >
            {goBackTo && (
              <>
                <IconButton
                  sx={{ mr: 1 }}
                  color="inherit"
                  onClick={() => navigate(goBackTo)}
                >
                  <ArrowBackIcon />
                </IconButton>
              </>
            )}

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ flexGrow: 0, cursor: "default" }}
              >
                {title}
              </Typography>
            </Box>

            {afterTitle}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

import { FC, PropsWithChildren } from "react";
import Container, { ContainerProps } from "@mui/material/Container";

type IAppContainerProps = PropsWithChildren<{
  containerProps?: ContainerProps;
}>;

const AppContainer: FC<IAppContainerProps> = ({ children, containerProps }) => {
  return (
    <>
      <Container {...containerProps} sx={{ height: "100%" }}>
        {children}
      </Container>
    </>
  );
};

export default AppContainer;

import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

const LoginBox: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1.5rem"
      padding="3rem 7rem"
      border="2px solid #5c5c5c"
      borderRadius="10px"
      sx={{
        backgroundColor: "#1b1b1b",
      }}
    >
      {children}
    </Box>
  );
};

export default LoginBox;

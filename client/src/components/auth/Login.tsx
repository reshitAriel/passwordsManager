import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert, FormControl, Link, Typography } from "@mui/material";
import LoginBox from "./LoginBox";
import { PasswordInput } from "../PasswordInput";
import { useNavigate } from "react-router-dom";

interface LoginData {
  username: string;
  password: string;
}
const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
      await axios.post("/api/auth/login", data);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    loginMutation.mutate({ username, password });
  };

  return (
    <>
      <FormControl>
        <LoginBox>
          <TextField
            label="Email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>

          <Typography>
            Doesn't have an account yet? <Link href="/register">Register</Link>
          </Typography>
        </LoginBox>
      </FormControl>
      {!!loginMutation.error && (
        <Alert severity="error">
          Login Failed: Wrong credentials or missing access rights to
          application
        </Alert>
      )}
    </>
  );
};

export default Login;

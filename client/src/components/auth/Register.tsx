import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert, FormControl, Link, Typography } from "@mui/material";
import LoginBox from "./LoginBox";
import { PasswordInput } from "../PasswordInput";
import { registerSchema } from "./registerSchema";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const registerInitialUser = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const Register: FC = () => {
  const [user, setUser] = useState<RegisterData>(registerInitialUser);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterData) => {
      await axios.post("/api/auth/register", data);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await registerSchema.validate(user);
      registerMutation.mutate(user);
    } catch (err) {
      setError((err as Record<string, string>)?.message);
    }
  };

  return (
    <FormControl>
      <LoginBox>
        <TextField
          id="name"
          label="Name"
          type="text"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          id="username"
          label="Username"
          type="username"
          value={user.username}
          onChange={handleChange}
        />
        <PasswordInput
          id="password"
          label="Password"
          value={user.password}
          onChange={handleChange}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
        />
        {!!error && <Alert severity="warning">{error}</Alert>}

        <Button variant="contained" onClick={handleSubmit}>
          Register
        </Button>
        <Typography>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </LoginBox>
      {!!registerMutation.error && (
        <Alert severity="error">an Error occurred, pleas try again later</Alert>
      )}
    </FormControl>
  );
};

export default Register;

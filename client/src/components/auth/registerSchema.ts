import { object, ref, string } from "yup";

export const registerSchema = object({
    name: string().required(),
    username: string().required(),
    password: string().required(),
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords must match'),
});
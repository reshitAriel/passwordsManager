import { number, object, string } from "yup";

export const siteSchema = object({
    id: number().optional(),
    name: string().required(),
    username: string().required(),
    password: string().required(),
});
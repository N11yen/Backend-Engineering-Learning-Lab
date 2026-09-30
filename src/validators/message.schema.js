import { z } from "zod";

export const createMessageSchema = z.object({
    content: z
    .string()
    .trim()
    .min(1, "El contenido es obligatorio")
    .max(500, "El contenido no puede superar 500 caracteres"),
    author: z
    .string()
    .trim()
    .min(1, "El autor no puede estar vacío")
    .max(100, "El autor no puede superar 100 caracteres")
    .optional()
});
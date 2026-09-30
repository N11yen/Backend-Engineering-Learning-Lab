import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Query Messages Schema
|--------------------------------------------------------------------------
*/

const queryMessagesSchema = z.object({

    read: z
        .enum(["true", "false"])
        .transform(value => value === "true")
        .optional(),

    author: z
        .string()
        .trim()
        .min(1, "El autor no puede estar vacío")
        .optional(),

    order: z
        .enum(["asc", "desc"])
        .default("desc"),

    page: z
        .preprocess(
            value => value === undefined ? 1 : Number(value),
            z
                .number()
                .int("La página debe ser un número entero")
                .min(1, "La página debe ser mayor o igual a 1")
        ),

    limit: z
        .preprocess(
            value => value === undefined ? 10 : Number(value),
            z
                .number()
                .int("El límite debe ser un número entero")
                .min(1, "El límite debe ser mayor o igual a 1")
                .max(100, "El límite no puede superar 100")
        )

});

/*
|--------------------------------------------------------------------------
| Query Messages DTO
|--------------------------------------------------------------------------
*/

export function queryMessagesDTO(input = {}) {

    return queryMessagesSchema.parse(input);

}
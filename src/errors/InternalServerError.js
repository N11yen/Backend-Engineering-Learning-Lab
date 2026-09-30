
import AppError from "./AppError.js";

export default class InternalServerError extends AppError {
    constructor(message = "Error interno del servidor") {
        super(message, 500);
    }
}
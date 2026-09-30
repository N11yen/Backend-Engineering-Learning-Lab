import AppError from "../errors/AppError.js";
import { ZodError } from "zod";

export default function errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: "Validation failed",
            details: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }

    const statusCode = err.statusCode || 500;

    if (err instanceof AppError) {
        return res.status(statusCode).json({
            success: false,
            error: err.message
        });
    }

    return res.status(statusCode).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
}
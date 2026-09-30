
import express from "express";
import messageRouter from "./src/routes/messages.routes.js";
import logger from "./src/middlewere/logger.js";
import errorHandler from "./src/middlewere/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/docs/swagger.js";

const app = express();

// middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(logger);

// rutas
app.use("/messages", messageRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 👇 ruta para test 500
app.get("/force-error", (req, res, next) => {
    throw new Error("Unexpected failure");
});

//  404 handler
app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found"
    });
});

// middleware de errores /(siempre al final
app.use(errorHandler);

const PORT = 3000;

export default app;


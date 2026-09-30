import request from "supertest";
import app from "../../../app.js";

describe("Error Handler . Integration", () => {

    describe("400 - Bad Request errors", () => {
        test("should return 400 when creating message without text", async () => {
            const res = await request(app)
            .post("/messages")
            .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("error");
        });

        test("should return 400 for invalid query param", async () => {
            const res = await request(app)
            .get("/messages")
            .query({ limit: -5});

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("error");
        });
    });

    describe("404 - Not Found errors", () => {
        test("should return 404 for non existing route", async () => {
            const res = await request(app)
            .get("/ruta-inexistente");

            expect(res.statusCode).toBe(404);
        });
    });

    describe("500 - Unhandled errors", () => {
        test("should return 500 when an unexpected error occurs", async () => {

            // Creamos una ruta temporal para forzar error
            app.get("/force-error", (req, res, next) => {
                throw new Error("Unexpected failure");
            });

            const res = await request(app)
            .get("/force-error");

            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty("error");
        });
    });
});
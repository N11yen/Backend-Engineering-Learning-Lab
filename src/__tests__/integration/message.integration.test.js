import request from "supertest";
import app from "../../../app.js";
import { seedMessages } from "../helpers/testData.js"

describe("Messages API - Integration", () => {

    beforeEach(async () => {
        // Limpiar base antes de empezar
        await request(app).delete("/messages");

        // seed data
        for (const msg of seedMessages) {
            await request(app)
            .post("/messages")
            .send(msg);
        }
    });

    describe("GET /messages - Basic behaviour", () => {

        test("should retur 200 and an array", async () => {
            const res = await request(app).get("/messages");

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test("should return all seeded messages", async () => {
            const res = await request(app).get("/messages");

            expect(res.body.length).toBe(seedMessages.length);
        });

    }); 
    
    describe("GET /messages - Filtering", () => {

        test("should filter messages by author", async () => {
            const res = await request(app)
            .get("/messages")
            .query({ author: "Juan"});

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(3);

            res.body.forEach(msg => {
                expect(msg.author).toBe("Juan");
            });
        });

        test("should return empty array if author does not exist", async () => {
            const res = await request(app)
            .get("/messages")
            .query({ author: "Inexistente"});

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    describe("GET /messages - Pagination", () => {

        test("should limit number of results", async () => {
            const res = await request(app)
            .get("/messages")
            .query({ limit: 2});

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
        });

        test("should return correct page with limit and page", async () => {
            const res = await request(app)
            .get("/messages")
            .query({ limit: 2, page: 2});

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
        });

    });

    describe("GET /messages - Combined filters", () => {

        test("should filter and paginate together", async () => {
            const res = await request(app)
            .get("/messages")
            .query({ author: "Juan", limit: 2, page: 1});

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);

            res.body.forEach(msg =>{
                expect(msg.author).toBe("Juan");
            });
        });
    });

    describe("POST /messages", () => {

        test("should create a new message", async () => {
            const newMessage = { text: "Nuevo mensaje", author: "Carlos" };

            const res = await request(app)
            .post("/messages")
            .send(newMessage);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("id");
            expect(res.body.text).toBe(newMessage.text);
        });

    });

});
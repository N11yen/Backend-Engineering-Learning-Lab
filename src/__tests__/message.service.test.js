import { jest } from "@jest/globals";

/*
|--------------------------------------------------------------------------
| Mock del Repository
|--------------------------------------------------------------------------
| El Service depende del Repository.
| En este unit test no queremos ejecutar Prisma ni PostgreSQL.
|
| Por eso mockeamos únicamente el contrato público actual
| de message.repository.js.
|--------------------------------------------------------------------------
*/

const create = jest.fn();
const findAll = jest.fn();
const findById = jest.fn();
const update = jest.fn();
const deleteAll = jest.fn();

await jest.unstable_mockModule(
    "../repositories/message.repository.js",
    () => ({
        create,
        findAll,
        findById,
        update,
        deleteAll
    })
);

// Importamos el Service DESPUÉS de registrar el mock.

const {
    createMessage,
    getMessages,
    markAsRead
} = await import("../services/message.service.js");

// Tests

describe("Message service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // -----------------------------------------------------------------
    // createMessage
    // -----------------------------------------------------------------

    describe("createMessage", () => {

        test("crea un mensaje correctamente cuando el texto es válido", async () => {

            const fakeMessage = {
                id: 1,
                content: "hola mundo",
                read: false
            };

            create.mockResolvedValue(fakeMessage);

            const result = await createMessage("hola mundo");

            expect(result).toEqual(fakeMessage);

            expect(create).toHaveBeenCalledTimes(1);

            expect(create).toHaveBeenCalledWith({
                content: "hola mundo"
            });

        });

        test("lanza BadRequestError si el texto es inválido", async () => {

            await expect(createMessage(""))
                .rejects
                .toThrow();

            expect(create).not.toHaveBeenCalled();

        });

        test("propaga el error si repository.create falla", async () => {

            create.mockRejectedValue(
                new Error("Repository error")
            );

            await expect(createMessage("hola"))
                .rejects
                .toThrow("Repository error");

            expect(create).toHaveBeenCalledWith({
                content: "hola"
            });

        });

    });

    // -----------------------------------------------------------------
    // getMessages
    // -----------------------------------------------------------------

    describe("getMessages", () => {

        test("devuelve lista de mensajes", async () => {

            const fakeMessages = [
                {
                    id: 1,
                    content: "hola",
                    read: false
                }
            ];

            findAll.mockResolvedValue(fakeMessages);

            const result = await getMessages();

            expect(result).toEqual(fakeMessages);

            expect(findAll).toHaveBeenCalledTimes(1);

            expect(findAll).toHaveBeenCalledWith({});

        });

        test("transmite los parámetros de consulta al repository", async () => {

            const query = {
                read: true,
                author: "Juan",
                order: "asc",
                page: 2,
                limit: 20
            };

            const fakeMessages = [
                {
                    id: 1,
                    content: "hola",
                    read: true,
                    author: "Juan"
                }
            ];

            findAll.mockResolvedValue(fakeMessages);

            const result = await getMessages(query);

            expect(result).toEqual(fakeMessages);

            expect(findAll).toHaveBeenCalledTimes(1);

            expect(findAll).toHaveBeenCalledWith(query);

        });

        test("propaga el error si repository.findAll falla", async () => {

            findAll.mockRejectedValue(
                new Error("Repository error")
            );

            await expect(getMessages())
                .rejects
                .toThrow("Repository error");

        });

    });

    // -----------------------------------------------------------------
    // markAsRead
    // -----------------------------------------------------------------

    describe("markAsRead", () => {

        test("marca un mensaje como leído correctamente", async () => {

            const fakeMessage = {
                id: 1,
                content: "hola",
                read: false
            };

            const updatedMessage = {
                ...fakeMessage,
                read: true
            };

            findById.mockResolvedValue(fakeMessage);

            update.mockResolvedValue(updatedMessage);

            const result = await markAsRead(1);

            expect(result).toEqual(updatedMessage);

            expect(findById).toHaveBeenCalledTimes(1);

            expect(findById).toHaveBeenCalledWith(1);

            expect(update).toHaveBeenCalledTimes(1);

            expect(update).toHaveBeenCalledWith(1, {
                read: true
            });

        });

        test("lanza error si el mensaje no existe", async () => {

            findById.mockResolvedValue(null);

            await expect(markAsRead(99))
                .rejects
                .toThrow();

            expect(findById).toHaveBeenCalledWith(99);

            expect(update).not.toHaveBeenCalled();

        });

        test("propaga el error si repository.update falla", async () => {

            const fakeMessage = {
                id: 1,
                content: "hola",
                read: false
            };

            findById.mockResolvedValue(fakeMessage);

            update.mockRejectedValue(
                new Error("Repository error")
            );

            await expect(markAsRead(1))
                .rejects
                .toThrow("Repository error");

            expect(findById).toHaveBeenCalledWith(1);

            expect(update).toHaveBeenCalledWith(1, {
                read: true
            });

        });

    });

});
import { Router } from "express";
import * as controller from "../controllers/messages.controller.js";

const router = Router();

/**
 * @swagger
 * /messages:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Obtener lista de mensajes
 *     description: Devuelve todos los mensajes almacenados.
 *     operationId: getMessages
 *     responses:
 *       200:
 *         description: Lista de mensajes obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Message"
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /messages:
 *   post:
 *     tags:
 *       - Messages
 *     summary: Crear un mensaje
 *     description: Crea un nuevo mensaje en la base de datos.
 *     operationId: createMessage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateMessageDTO"
 *     responses:
 *       201:
 *         description: Mensaje creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Message"
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", controller.create);

/**
 * @swagger
 * /messages:
 *   delete:
 *     tags:
 *       - Messages
 *     summary: Eliminar todos los mensajes
 *     description: Elimina todos los mensajes almacenados.
 *     operationId: deleteAllMessages
 *     responses:
 *       204:
 *         description: Todos los mensajes fueron eliminados correctamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/", controller.removeAll);

export default router;
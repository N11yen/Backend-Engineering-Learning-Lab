import * as service from "../services/message.service.js";
import { createMessageSchema } from "../validators/message.schema.js"

export async function getAll(req, res, next) {
    try {

        const messages = await service.getMessages();

        res.json(messages);

    } catch (err) {

        next(err);
    }
}

export async function create(req, res, next) {
    try {

        const { content, author } = createMessageSchema.parse(req.body);
        
        const message = await service.createMessage(content, author);
        
        res.status(201).json(message);

    } catch (err) {
        
        next(err);
    }
}


export async function removeAll(req, res, next) {
    try {
        await service.deleteAllMessages();

        res.status(204).send();

    } catch (err) {

        next(err);
    }
}

import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";

import * as messageRepository from "../repositories/message.repository.js";

export async function createMessage(content, author) {

    if (!content || typeof content !== "string" || !content.trim()) {
        throw new BadRequestError("Texto inválido");
    }

    const data = {
        content: content.trim()
    };

    if (author !== undefined) {
        data.author = author.trim();
    }

    return await messageRepository.create(data);

}

export async function getMessageById(id) {

    const message = await messageRepository.findById(id);

    if (!message) {
        throw new NotFoundError("Mensaje no encontrado");
    }

    return message;

}

export async function getMessages(query = {}) {

    return await messageRepository.findAll(query);

}

export async function markAsRead(id) {

    const message = await messageRepository.findById(id);

    if (!message) {
        throw new NotFoundError("Mensaje no encontrado");
    }

    return await messageRepository.update(id, {
        read: true
    });

}

export async function deleteAllMessages() {

    return await messageRepository.deleteAll();

}
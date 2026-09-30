import prisma from "../config/prisma.js";

/*
|--------------------------------------------------------------------------
| Message Repository
|--------------------------------------------------------------------------
| Única capa responsable de comunicarse con PostgreSQL mediante Prisma.
| No contiene reglas de negocio.
|--------------------------------------------------------------------------
*/

/**
 * Crear mensaje
 */
export async function create(data) {
    return prisma.message.create({
        data
    });
}

/**
 * Obtener todos los mensajes
 */
export async function findAll() {
    return prisma.message.findMany({
        orderBy: {
            id: "desc"
        }
    });
}

/**
 * Buscar por ID
 */
export async function findById(id) {
    return prisma.message.findUnique({
        where: {
            id: Number(id)
        }
    });
}

/**
 * Actualizar un mensaje
 */
export async function update(id, data) {
    return prisma.message.update({
        where: {
            id: Number(id)
        },
        data
    });
}

/**
 * Eliminar todos los mensajes
 */
export async function deleteAll() {
    return prisma.message.deleteMany();
}
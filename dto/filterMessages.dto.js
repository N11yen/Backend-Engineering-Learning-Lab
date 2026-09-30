
import  BadRequestError  from "../errors/BadRequestError.js"

export function filterMessagesDTO(query) {
    const filters = {};

    if (query.read !== undefined) {
        if (query.read !== "true" && query.read !== "false") {
            throw new BadRequestError("El query 'read' debe ser true o false");
        }
        filters.read = query.read ==="true";
    }
    
    return filters
}
import BadRequestError from "../errors/BadRequestError.js";

export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {

            return next(
                new BadRequestError(
                    result.error.issues
                    .map(issue => issue.message)
                    .join(", ")
                )
            );
        }
        req.body = result.data;

        next();
    };Ñ
}
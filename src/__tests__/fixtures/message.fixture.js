/*
|--------------------------------------------------------------------------
| Message Business Rules
|--------------------------------------------------------------------------
*/

export const MAX_CONTENT_LENGTH = 500;

/*
|--------------------------------------------------------------------------
| Valid scenarios
|--------------------------------------------------------------------------
*/

export const validMessage = {
    content: "Hello World"
};

export const paddedMessage = {
    content: "     Hello World     "
};

export const oneCharacterMessage = {
    content: "A"
};

export const maxLengthMinusOneMessage = {
    content: "A".repeat(MAX_CONTENT_LENGTH - 1)
};

export const maxLengthMessage = {
    content: "A".repeat(MAX_CONTENT_LENGTH)
};

/*
|--------------------------------------------------------------------------
| Invalid scenarios
|--------------------------------------------------------------------------
*/

export const emptyMessage = {
    content: ""
};

export const whitespaceMessage = {
    content: "     "
};

export const tooLongMessage = {
    content: "A".repeat(MAX_CONTENT_LENGTH + 1)
};
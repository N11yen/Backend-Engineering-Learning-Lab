/*
|--------------------------------------------------------------------------
| Query Messages Business Rules
|--------------------------------------------------------------------------
*/

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_ORDER = "desc";

export const MAX_LIMIT = 100;

/*
|--------------------------------------------------------------------------
| Valid scenarios
|--------------------------------------------------------------------------
*/

export const validQuery = {
    page: "2",
    limit: "20",
    read: "false",
    author: "Juan",
    order: "asc"
};

export const emptyQuery = {};
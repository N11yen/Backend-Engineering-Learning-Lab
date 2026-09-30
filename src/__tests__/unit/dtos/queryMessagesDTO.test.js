import { queryMessagesDTO } from "../../../dtos/queryMessagesDTO.js";

import {
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    DEFAULT_ORDER,
    validQuery,
    emptyQuery
} from "../../fixtures/queryMessages.fixture.js";

describe("queryMessagesDTO", () => {

    // ---------------------------------------------------------------------
    // VALID INPUT
    // ---------------------------------------------------------------------

    describe("valid input", () => {

        it("should transform a valid query", () => {

            // Arrange
            const input = { ...validQuery };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result).toEqual({
                page: 2,
                limit: 20,
                read: false,
                author: "Juan",
                order: "asc"
            });

        });

        it("should transform read true to boolean", () => {

            // Arrange
            const input = {
                read: "true"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.read).toBe(true);

        });

        it("should transform read false to boolean", () => {

            // Arrange
            const input = {
                read: "false"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.read).toBe(false);

        });

        it("should trim author whitespace", () => {

            // Arrange
            const input = {
                author: "     Juan     "
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.author).toBe("Juan");

        });

        it("should accept ascending order", () => {

            // Arrange
            const input = {
                order: "asc"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.order).toBe("asc");

        });

        it("should accept descending order", () => {

            // Arrange
            const input = {
                order: "desc"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.order).toBe("desc");

        });

        it("should transform page string to number", () => {

            // Arrange
            const input = {
                page: "2"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.page).toBe(2);

        });

        it("should transform limit string to number", () => {

            // Arrange
            const input = {
                limit: "20"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.limit).toBe(20);

        });

    });

    // ---------------------------------------------------------------------
    // DEFAULT VALUES
    // ---------------------------------------------------------------------

    describe("default values", () => {

        it("should apply default values when query is empty", () => {

            // Arrange
            const input = { ...emptyQuery };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result).toEqual({
                order: DEFAULT_ORDER,
                page: DEFAULT_PAGE,
                limit: DEFAULT_LIMIT
            });

        });

    });

    // ---------------------------------------------------------------------
    // INVALID INPUT
    // ---------------------------------------------------------------------

    describe("invalid input", () => {

        describe("invalid read", () => {

            test.each([
                ["number string", "1"],
                ["zero string", "0"],
                ["yes", "yes"],
                ["no", "no"],
                ["empty string", ""]
            ])(
                "should reject %s as read",
                (typeName, value) => {

                    // Arrange
                    const input = {
                        read: value
                    };

                    // Act & Assert
                    expect(() => {
                        queryMessagesDTO(input);
                    }).toThrow();

                }
            );

        });

        describe("invalid order", () => {

            test.each([
                ["ascending", "ascending"],
                ["descending", "descending"],
                ["invalid value", "foo"],
                ["empty string", ""]
            ])(
                "should reject %s as order",
                (typeName, value) => {

                    // Arrange
                    const input = {
                        order: value
                    };

                    // Act & Assert
                    expect(() => {
                        queryMessagesDTO(input);
                    }).toThrow();

                }
            );

        });

        describe("invalid author", () => {

            test.each([
                ["empty string", ""],
                ["whitespace only", "     "]
            ])(
                "should reject %s as author",
                (typeName, value) => {

                    // Arrange
                    const input = {
                        author: value
                    };

                    // Act & Assert
                    expect(() => {
                        queryMessagesDTO(input);
                    }).toThrow();

                }
            );

        });

        describe("invalid page", () => {

            test.each([
                ["zero", "0"],
                ["negative number", "-1"],
                ["decimal", "1.5"],
                ["text", "abc"]
            ])(
                "should reject %s as page",
                (typeName, value) => {

                    // Arrange
                    const input = {
                        page: value
                    };

                    // Act & Assert
                    expect(() => {
                        queryMessagesDTO(input);
                    }).toThrow();

                }
            );

        });

        describe("invalid limit", () => {

            test.each([
                ["zero", "0"],
                ["negative number", "-1"],
                ["decimal", "1.5"],
                ["text", "abc"],
                ["above maximum", "101"]
            ])(
                "should reject %s as limit",
                (typeName, value) => {

                    // Arrange
                    const input = {
                        limit: value
                    };

                    // Act & Assert
                    expect(() => {
                        queryMessagesDTO(input);
                    }).toThrow();

                }
            );

        });

    });

   // ---------------------------------------------------------------------
// BOUNDARY VALUES
// ---------------------------------------------------------------------

describe("boundary values", () => {

    describe("minimum page", () => {

        it("should accept page 1", () => {

            // Arrange
            const input = {
                page: "1"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.page).toBe(1);

        });

    });

    describe("minimum limit", () => {

        it("should accept limit 1", () => {

            // Arrange
            const input = {
                limit: "1"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.limit).toBe(1);

        });

    });

    describe("maximum limit", () => {

        it("should accept limit 100", () => {

            // Arrange
            const input = {
                limit: "100"
            };

            // Act
            const result = queryMessagesDTO(input);

            // Assert
            expect(result.limit).toBe(100);

        });

    });

});

});
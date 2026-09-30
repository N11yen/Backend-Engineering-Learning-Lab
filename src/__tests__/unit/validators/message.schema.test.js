import { ZodError } from "zod";
import { createMessageSchema } from "../../../validators/message.schema.js";

import {
    validMessage,
    paddedMessage,
    emptyMessage,
    whitespaceMessage,
    oneCharacterMessage,
    maxLengthMinusOneMessage,
    maxLengthMessage,
    tooLongMessage
} from "../../fixtures/message.fixture.js";

describe("createMessageSchema", () => {

    // ---------------------------------------------------------------------
    // VALID INPUT
    // ---------------------------------------------------------------------

    describe("valid input", () => {

        it("should accept a valid message", () => {

            // Arrange
            const input = { ...validMessage };

            // Act
            const result = createMessageSchema.parse(input);

            // Assert
            expect(result).toEqual(validMessage);

        });

        it("should trim surrounding whitespace", () => {

            // Arrange
            const input = { ...paddedMessage };

            // Act
            const result = createMessageSchema.parse(input);

            // Assert
            expect(result).toEqual(validMessage);

        });

    });

    // ---------------------------------------------------------------------
    // INVALID INPUT
    // ---------------------------------------------------------------------

    describe("invalid input", () => {

        describe("empty content", () => {

            it("should reject an empty string", () => {

                // Arrange
                const input = { ...emptyMessage };
                let error;

                // Act
                try {

                    createMessageSchema.parse(input);

                } catch (err) {

                    error = err;

                }

                // Assert
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(ZodError);
                expect(error.issues).toHaveLength(1);
                expect(error.issues[0].path).toEqual(["content"]);
                expect(error.issues[0].message)
                    .toBe("El contenido es obligatorio");

            });

            describe("missing content", () => {

                it("should reject missing content", () => {

                    // Arrange
                    const input = {};

                    let error;

                    // Act
                    try {

                        createMessageSchema.parse(input);

                    } catch (err) {

                        error = err;

                    }

                    // Assert
                    expect(error).toBeDefined();
                    expect(error).toBeInstanceOf(ZodError);
                    expect(error.issues).toHaveLength(1);
                    expect(error.issues[0].path).toEqual(["content"]);

                });

            });

            it("should reject whitespace only", () => {

                // Arrange
                const input = { ...whitespaceMessage };

                let error;

                // Act
                try {

                    createMessageSchema.parse(input);

                } catch (err) {

                    error = err;

                }

                // Assert
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(ZodError);
                expect(error.issues).toHaveLength(1);
                expect(error.issues[0].path).toEqual(["content"]);
                expect(error.issues[0].message)
                    .toBe("El contenido es obligatorio");

            });

        });

        describe("invalid type", () => {

            test.each([
                ["null", null],
                ["undefined", undefined],
                ["number", 123],
                ["object", {}],
            ])(
                "should reject %s as content",
                (typeName, value) => {

                    // Arrange
                    const imput = {
                        content: value
                    };

                    let error;

                    // Act 
                    try {

                        createMessageSchema.parse(imput);

                    } catch (err) {

                        error = err;

                    }

                    // Assert
                    expect(error).toBeDefined();
                    expect(error).toBeInstanceOf(ZodError);
                    expect(error.issues).toHaveLength(1);
                    expect(error.issues[0].path).toEqual(["content"]);

                }
            );

        });

        describe("array", () => {

            it("should reject an array as content", () => {

                // Arrange
                const input = {
                    content: []
                };

                let error;

                // Act
                try {

                    createMessageSchema.parse(input);

                } catch (err) {

                    error = err;

                }

                // Assert
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(ZodError);
                expect(error.issues).toHaveLength(2);
                expect(error.issues[0].path).toEqual(["content"]);
                expect(error.issues[1].path).toEqual(["content"]);

            });

        });

    });

    // ---------------------------------------------------------------------
    // BOUNDARY VALUE ANALYSIS
    // ---------------------------------------------------------------------

    describe("boundary values", () => {

        describe("minimum length", () => {

            it("should accept one character", () => {

                // Arrange
                const input = { ...oneCharacterMessage };

                // Act
                const result = createMessageSchema.parse(input);

                // Assert
                expect(result).toEqual(oneCharacterMessage);

            });

        });

        describe("maximum length", () => {

            it("should accept 499 characters", () => {

                // Arrange
                const input = { ...maxLengthMinusOneMessage };

                // Act
                const result = createMessageSchema.parse(input);

                // Assert
                expect(result).toEqual(maxLengthMinusOneMessage);

            });

            it("should accept 500 characters", () => {

                // Arrange
                const input = { ...maxLengthMessage };

                // Act
                const result = createMessageSchema.parse(input);

                // Assert
                expect(result).toEqual(maxLengthMessage);

            });

            it("should reject 501 characters", () => {

                // Arrange
                const input = { ...tooLongMessage };

                let error;

                // Act 
                try {

                    createMessageSchema.parse(input);

                } catch (err) {

                    error = err;
                }

                // Assert
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(ZodError);
                expect(error.issues).toHaveLength(1);
                expect(error.issues[0].path).toEqual(["content"]);
                expect(error.issues[0].message)
                    .toBe("El contenido no puede superar 500 caracteres");

            });

        });

    });

});
/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { SeedApiClient } from "../src/Client";

const client = new SeedApiClient({
    environment: process.env.TESTS_BASE_URL || "test",
    token: process.env.TESTS_AUTH || "test",
});

describe("Imdb", () => {
    test("createMovie", async () => {
        const response = await client.imdb.createMovie({
            title: "string",
            rating: 1.1,
        });
        expect(response).toEqual("string");
    });

    test("getMovie", async () => {
        const response = await client.imdb.getMovie("string");
        expect(response).toEqual({ id: "string", title: "string", rating: 1.1 });
    });
});
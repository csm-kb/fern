/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../../../errors";
import * as SeedExhaustive from "../../..";

export class BadRequestBody extends errors.SeedExhaustiveError {
    constructor(body: SeedExhaustive.BadObjectRequestInfo) {
        super({
            message: "BadRequestBody",
            statusCode: 400,
            body: body,
        });
        Object.setPrototypeOf(this, BadRequestBody.prototype);
    }
}
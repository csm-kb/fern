/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.basicAuth.resources.errors.errors;

import com.seed.basicAuth.core.SeedBasicAuthApiException;

public final class BadRequest extends SeedBasicAuthApiException {
    public BadRequest(Object body) {
        super("BadRequest", 400, body);
    }
}
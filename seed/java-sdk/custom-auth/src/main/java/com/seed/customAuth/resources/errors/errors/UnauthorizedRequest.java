/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.customAuth.resources.errors.errors;

import com.seed.customAuth.core.SeedCustomAuthApiException;
import com.seed.customAuth.resources.errors.types.UnauthorizedRequestErrorBody;

public final class UnauthorizedRequest extends SeedCustomAuthApiException {
    /**
     * The body of the response that triggered the exception.
     */
    private final UnauthorizedRequestErrorBody body;

    public UnauthorizedRequest(UnauthorizedRequestErrorBody body) {
        super("UnauthorizedRequest", 401, body);
        this.body = body;
    }

    /**
     * @return the body
     */
    @java.lang.Override
    public UnauthorizedRequestErrorBody body() {
        return this.body;
    }
}
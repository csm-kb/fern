/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.exhaustive.resources.types.object.errors;

import com.seed.exhaustive.core.BestApiException;
import com.seed.exhaustive.resources.types.object.types.NestedObjectWithOptionalField;

public final class NestedObjectWithOptionalFieldError extends BestApiException {
    /**
     * The body of the response that triggered the exception.
     */
    private final NestedObjectWithOptionalField body;

    public NestedObjectWithOptionalFieldError(NestedObjectWithOptionalField body) {
        super("NestedObjectWithOptionalFieldError", 400, body);
        this.body = body;
    }

    /**
     * @return the body
     */
    @java.lang.Override
    public NestedObjectWithOptionalField body() {
        return this.body;
    }
}
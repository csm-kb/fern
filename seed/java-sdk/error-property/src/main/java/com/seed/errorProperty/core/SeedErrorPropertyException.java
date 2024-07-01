/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.errorProperty.core;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedErrorPropertyException extends RuntimeException {
    public SeedErrorPropertyException(String message) {
        super(message);
    }

    public SeedErrorPropertyException(String message, Exception e) {
        super(message, e);
    }
}
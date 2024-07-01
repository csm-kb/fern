/**
 * This file was auto-generated by Fern from our API Definition.
 */

package com.fern.sdk.core;

import java.lang.Exception;
import java.lang.RuntimeException;
import java.lang.String;

/**
 * This class serves as the base exception for all errors in the SDK.
 */
public class SeedExhaustiveException extends RuntimeException {
  public SeedExhaustiveException(String message) {
    super(message);
  }

  public SeedExhaustiveException(String message, Exception e) {
    super(message, e);
  }
}
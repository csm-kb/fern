/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.types.object.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = DoubleOptional.Builder.class
)
public final class DoubleOptional {
  private final Optional<OptionalAlias> optionalAlias;

  private DoubleOptional(Optional<OptionalAlias> optionalAlias) {
    this.optionalAlias = optionalAlias;
  }

  @JsonProperty("optionalAlias")
  public Optional<OptionalAlias> getOptionalAlias() {
    return optionalAlias;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof DoubleOptional && equalTo((DoubleOptional) other);
  }

  private boolean equalTo(DoubleOptional other) {
    return optionalAlias.equals(other.optionalAlias);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.optionalAlias);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static Builder builder() {
    return new Builder();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder {
    private Optional<OptionalAlias> optionalAlias = Optional.empty();

    private Builder() {
    }

    public Builder from(DoubleOptional other) {
      optionalAlias(other.getOptionalAlias());
      return this;
    }

    @JsonSetter(
        value = "optionalAlias",
        nulls = Nulls.SKIP
    )
    public Builder optionalAlias(Optional<OptionalAlias> optionalAlias) {
      this.optionalAlias = optionalAlias;
      return this;
    }

    public Builder optionalAlias(OptionalAlias optionalAlias) {
      this.optionalAlias = Optional.of(optionalAlias);
      return this;
    }

    public DoubleOptional build() {
      return new DoubleOptional(optionalAlias);
    }
  }
}
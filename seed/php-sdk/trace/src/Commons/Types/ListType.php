<?php

namespace Seed\Commons\Types;

use Seed\Core\Json\JsonSerializableType;
use Seed\Core\Json\JsonProperty;

class ListType extends JsonSerializableType
{
    /**
     * @var mixed $valueType
     */
    #[JsonProperty('valueType')]
    public mixed $valueType;

    /**
     * @var ?bool $isFixedLength Whether this list is fixed-size (for languages that supports fixed-size lists). Defaults to false.
     */
    #[JsonProperty('isFixedLength')]
    public ?bool $isFixedLength;

    /**
     * @param array{
     *   valueType: mixed,
     *   isFixedLength?: ?bool,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->valueType = $values['valueType'];
        $this->isFixedLength = $values['isFixedLength'] ?? null;
    }
}

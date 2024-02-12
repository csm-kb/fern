/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";

export const CompileError: core.serialization.ObjectSchema<serializers.CompileError.Raw, SeedTrace.CompileError> =
    core.serialization.object({
        message: core.serialization.string(),
    });

export declare namespace CompileError {
    interface Raw {
        message: string;
    }
}
/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernDocsConfig from "../../../../api";
import * as core from "../../../../core";

export const VersionFileConfig: core.serialization.ObjectSchema<
    serializers.VersionFileConfig.Raw,
    FernDocsConfig.VersionFileConfig
> = core.serialization.object({
    navigation: core.serialization.lazy(async () => (await import("../../..")).NavigationConfig),
});

export declare namespace VersionFileConfig {
    interface Raw {
        navigation: serializers.NavigationConfig.Raw;
    }
}
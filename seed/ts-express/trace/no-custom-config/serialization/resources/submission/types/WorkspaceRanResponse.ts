/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";

export const WorkspaceRanResponse: core.serialization.ObjectSchema<
    serializers.WorkspaceRanResponse.Raw,
    SeedTrace.WorkspaceRanResponse
> = core.serialization.object({
    submissionId: core.serialization.lazy(async () => (await import("../../..")).SubmissionId),
    runDetails: core.serialization.lazyObject(async () => (await import("../../..")).WorkspaceRunDetails),
});

export declare namespace WorkspaceRanResponse {
    interface Raw {
        submissionId: serializers.SubmissionId.Raw;
        runDetails: serializers.WorkspaceRunDetails.Raw;
    }
}
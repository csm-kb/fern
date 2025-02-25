import { AbsoluteFilePath, doesPathExist, join, RelativeFilePath } from "@fern-api/fs-utils";
import { TaskContext } from "@fern-api/task-context";
import { readFile } from "fs/promises";
import yaml from "js-yaml";
import path from "path";
import { validateSchema } from "../commons/validateSchema";
import { GENERATORS_CONFIGURATION_FILENAME } from "../constants";
import { convertGeneratorsConfiguration } from "./convertGeneratorsConfiguration";
import { GeneratorsConfiguration } from "./GeneratorsConfiguration";
import { GeneratorsConfigurationSchema, serialization } from "./schemas";

export async function loadRawGeneratorsConfiguration({
    absolutePathToWorkspace,
    context
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
    context: TaskContext;
}): Promise<GeneratorsConfigurationSchema | undefined> {
    const filepath = getPathToGeneratorsConfiguration({ absolutePathToWorkspace });
    if (!(await doesPathExist(filepath))) {
        return undefined;
    }
    const contentsStr = await readFile(filepath);
    try {
        const contentsParsed = yaml.load(contentsStr.toString());
        const parsed = serialization.GeneratorsConfigurationSchema.parse(contentsParsed, {
            allowUnrecognizedEnumValues: false,
            unrecognizedObjectKeys: "fail",
            allowUnrecognizedUnionMembers: false,
            skipValidation: false,
            breadcrumbsPrefix: undefined,
            omitUndefined: false
        });
        if (parsed.ok) {
            return parsed.value;
        }
        // TODO: improve error message
        throw new Error(parsed.errors.map((e) => e.message).join("\n"));
    } catch (e) {
        if (e instanceof yaml.YAMLException) {
            context.failAndThrow(`Failed to parse ${path.relative(process.cwd(), filepath)}: ${e.reason}`);
        } else {
            throw e;
        }
    }
    return undefined;
}

export async function loadGeneratorsConfiguration({
    absolutePathToWorkspace,
    context
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
    context: TaskContext;
}): Promise<GeneratorsConfiguration | undefined> {
    const rawGeneratorsConfiguration = await loadRawGeneratorsConfiguration({ absolutePathToWorkspace, context });
    if (rawGeneratorsConfiguration == null) {
        return undefined;
    }
    return convertGeneratorsConfiguration({
        absolutePathToGeneratorsConfiguration: getPathToGeneratorsConfiguration({ absolutePathToWorkspace }),
        rawGeneratorsConfiguration
    });
}

export function getPathToGeneratorsConfiguration({
    absolutePathToWorkspace
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
}): AbsoluteFilePath {
    return join(absolutePathToWorkspace, RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME));
}

import { FernGeneratorExec } from "@fern-api/generator-commons";
import { BaseGoCustomConfigSchema, resolveRootImportPath } from "@fern-api/go-ast";
import { FernFilepath, dynamic as DynamicSnippets, TypeId, Name } from "@fern-fern/ir-sdk/api";
import { HttpEndpointReferenceParser } from "@fern-api/fern-definition-schema";
import { TypeInstance } from "../TypeInstance";
import { DiscriminatedUnionTypeInstance } from "../DiscriminatedUnionTypeInstance";
import { DynamicTypeMapper } from "./DynamicTypeMapper";
import { DynamicTypeInstantiationMapper } from "./DynamicTypeInstantiationMapper";
import { go } from "@fern-api/go-ast";
import path from "path";
import { ErrorReporter, Severity } from "./ErrorReporter";

export class DynamicSnippetsGeneratorContext {
    public ir: DynamicSnippets.DynamicIntermediateRepresentation;
    public config: FernGeneratorExec.config.GeneratorConfig;
    public customConfig: BaseGoCustomConfigSchema | undefined;
    public errors: ErrorReporter;
    public dynamicTypeMapper: DynamicTypeMapper;
    public dynamicTypeInstantiationMapper: DynamicTypeInstantiationMapper;
    public rootImportPath: string;

    private httpEndpointReferenceParser: HttpEndpointReferenceParser;

    constructor({
        ir,
        config
    }: {
        ir: DynamicSnippets.DynamicIntermediateRepresentation;
        config: FernGeneratorExec.config.GeneratorConfig;
    }) {
        this.ir = ir;
        this.config = config;
        this.customConfig = config.customConfig != null ? (config.customConfig as BaseGoCustomConfigSchema) : undefined;
        this.errors = new ErrorReporter();
        this.dynamicTypeMapper = new DynamicTypeMapper({ context: this });
        this.dynamicTypeInstantiationMapper = new DynamicTypeInstantiationMapper({ context: this });
        this.rootImportPath = resolveRootImportPath({ config, customConfig: this.customConfig });
        this.httpEndpointReferenceParser = new HttpEndpointReferenceParser();
    }

    public associateQueryParametersByWireValue({
        parameters,
        values
    }: {
        parameters: DynamicSnippets.NamedParameter[];
        values: DynamicSnippets.Values;
    }): TypeInstance[] {
        const instances: TypeInstance[] = [];
        for (const [key, value] of Object.entries(values)) {
            this.errors.scope(key);
            try {
                const parameter = parameters.find((param) => param.name.wireValue === key);
                if (parameter == null) {
                    throw this.newParameterNotRecognizedError(key);
                }
                // If this query parameter supports allow-multiple, the user-provided values
                // must be wrapped in an array.
                const typeInstanceValue =
                    this.isListTypeReference(parameter.typeReference) && !Array.isArray(value) ? [value] : value;
                instances.push({
                    name: parameter.name,
                    typeReference: parameter.typeReference,
                    value: typeInstanceValue
                });
            } finally {
                this.errors.unscope();
            }
        }
        return instances;
    }

    public associateByWireValue({
        parameters,
        values,
        ignoreMissingParameters
    }: {
        parameters: DynamicSnippets.NamedParameter[];
        values: DynamicSnippets.Values;
        ignoreMissingParameters?: boolean;
    }): TypeInstance[] {
        const instances: TypeInstance[] = [];
        for (const [key, value] of Object.entries(values)) {
            this.errors.scope(key);
            try {
                const parameter = parameters.find((param) => param.name.wireValue === key);
                if (parameter == null) {
                    if (ignoreMissingParameters) {
                        // Required for request payloads that include more information than
                        // just the target parameters (e.g. union base properties).
                        continue;
                    }
                    this.errors.add({
                        severity: Severity.Critical,
                        message: this.newParameterNotRecognizedError(key).message
                    });
                    continue;
                }
                instances.push({
                    name: parameter.name,
                    typeReference: parameter.typeReference,
                    value
                });
            } finally {
                this.errors.unscope();
            }
        }
        return instances;
    }

    public getRecord(value: unknown): Record<string, unknown> | undefined {
        if (typeof value !== "object" || Array.isArray(value)) {
            this.errors.add({
                severity: Severity.Critical,
                message: `Expected object with key, value pairs but got: ${
                    Array.isArray(value) ? "array" : typeof value
                }`
            });
            return undefined;
        }
        if (value == null) {
            return {};
        }
        return value as Record<string, unknown>;
    }

    public resolveNamedType({ typeId }: { typeId: TypeId }): DynamicSnippets.NamedType | undefined {
        const namedType = this.ir.types[typeId];
        if (namedType == null) {
            this.errors.add({
                severity: Severity.Critical,
                message: `Type identified by "${typeId}" could not be found`
            });
            return undefined;
        }
        return namedType;
    }

    public resolveDiscriminatedUnionTypeInstance({
        discriminatedUnion,
        value
    }: {
        discriminatedUnion: DynamicSnippets.DiscriminatedUnionType;
        value: unknown;
    }): DiscriminatedUnionTypeInstance | undefined {
        const record = this.getRecord(value);
        if (record == null) {
            return undefined;
        }

        const discriminantFieldName = discriminatedUnion.discriminant.wireValue;
        const discriminantValue = record[discriminantFieldName];
        if (discriminantValue == null) {
            this.errors.add({
                severity: Severity.Critical,
                message: this.newParameterNotRecognizedError(discriminantFieldName).message
            });
            return undefined;
        }
        if (typeof discriminantValue !== "string") {
            this.errors.add({
                severity: Severity.Critical,
                message: `Expected discriminant value to be a string but got: ${typeof discriminantValue}`
            });
            return undefined;
        }

        const singleDiscriminatedUnionType = discriminatedUnion.types[discriminantValue];
        if (singleDiscriminatedUnionType == null) {
            this.errors.add({
                severity: Severity.Critical,
                message: `No type found for discriminant value "${discriminantValue}"`
            });
            return undefined;
        }

        // Remove the discriminant from the record so that the value is valid for the type.
        const { [discriminantFieldName]: _, ...filtered } = record;

        return {
            singleDiscriminatedUnionType,
            discriminantValue: singleDiscriminatedUnionType.discriminantValue,
            value: filtered
        };
    }

    public getMethodName(name: Name): string {
        return name.pascalCase.unsafeName;
    }

    public getTypeName(name: Name): string {
        return name.pascalCase.unsafeName;
    }

    public getImportPath(fernFilepath: FernFilepath): string {
        const parts = fernFilepath.packagePath.map((path) => path.pascalCase.unsafeName.toLowerCase());
        return [this.rootImportPath, ...parts].join("/");
    }

    public getContextTypeReference(): go.TypeReference {
        return go.typeReference({
            name: "Context",
            importPath: "context"
        });
    }

    public getContextTodoFunctionInvocation(): go.FuncInvocation {
        return go.invokeFunc({
            func: go.typeReference({
                name: "TODO",
                importPath: "context"
            }),
            arguments_: []
        });
    }

    public getClientImportPath(): string {
        return path.join(this.rootImportPath, "client");
    }

    public getOptionImportPath(): string {
        return path.join(this.rootImportPath, "option");
    }

    public resolveEndpointOrThrow(rawEndpoint: string): DynamicSnippets.Endpoint[] {
        const parsedEndpoint = this.httpEndpointReferenceParser.tryParse(rawEndpoint);
        if (parsedEndpoint == null) {
            throw new Error(`Failed to parse endpoint reference "${rawEndpoint}"`);
        }
        return this.resolveEndpointLocationOrThrow(parsedEndpoint);
    }

    public resolveEndpointLocationOrThrow(location: DynamicSnippets.EndpointLocation): DynamicSnippets.Endpoint[] {
        const endpoints: DynamicSnippets.Endpoint[] = [];
        for (const endpoint of Object.values(this.ir.endpoints)) {
            if (this.parsedEndpointMatches({ endpoint, parsedEndpoint: location })) {
                endpoints.push(endpoint);
            }
        }
        if (endpoints.length === 0) {
            throw new Error(`Failed to find endpoint identified by "${location.method} ${location.path}"`);
        }
        return endpoints;
    }

    public getGoTypeReferenceFromDeclaration({
        declaration
    }: {
        declaration: DynamicSnippets.Declaration;
    }): go.TypeReference {
        return go.typeReference({
            name: declaration.name.pascalCase.unsafeName,
            importPath: this.getImportPath(declaration.fernFilepath)
        });
    }

    private isListTypeReference(typeReference: DynamicSnippets.TypeReference): boolean {
        if (typeReference.type === "optional") {
            return this.isListTypeReference(typeReference.value);
        }
        return typeReference.type === "list" || typeReference.type === "set";
    }

    private parsedEndpointMatches({
        endpoint,
        parsedEndpoint
    }: {
        endpoint: DynamicSnippets.Endpoint;
        parsedEndpoint: HttpEndpointReferenceParser.Parsed;
    }): boolean {
        return endpoint.location.method === parsedEndpoint.method && endpoint.location.path === parsedEndpoint.path;
    }

    private newParameterNotRecognizedError(parameterName: string): Error {
        return new Error(`"${parameterName}" is not a recognized parameter for this endpoint`);
    }
}

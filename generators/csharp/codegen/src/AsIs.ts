export const ENUM_SERIALIZER_CLASS_NAME = "EnumSerializer";
export const STRING_ENUM_SERIALIZER_CLASS_NAME = "StringEnumSerializer";
export const ONE_OF_SERIALIZER_CLASS_NAME = "OneOfSerializer";
export const COLLECTION_ITEM_SERIALIZER_CLASS_NAME = "CollectionItemSerializer";
export const DATETIME_SERIALIZER_CLASS_NAME = "DateTimeSerializer";
export const CONSTANTS_CLASS_NAME = "Constants";
export const JSON_UTILS_CLASS_NAME = "JsonUtils";

export enum AsIsFiles {
    GitIgnore = ".gitignore.Template",
    CiYaml = "github-ci.yml",
    CollectionItemSerializer = "CollectionItemSerializer.cs",
    Constants = "Constants.cs",
    DateTimeSerializer = "DateTimeSerializer.cs",
    EnumConverter = "EnumConverter.Template.cs",
    GrpcRequestOptions = "GrpcRequestOptions.Template.cs",
    Headers = "Headers.Template.cs",
    HeaderValue = "HeaderValue.Template.cs",
    HttpMethodExtensions = "HttpMethodExtensions.cs",
    JsonConfiguration = "JsonConfiguration.cs",
    OneOfSerializer = "OneOfSerializer.cs",
    RawClient = "RawClient.Template.cs",
    RawClientTests = "RawClientTests.Template.cs",
    RawGrpcClient = "RawGrpcClient.Template.cs",
    EnumSerializer = "EnumSerializer.Template.cs",
    EnumSerializerTests = "EnumSerializerTests.Template.cs",
    StringEnum = "StringEnum.Template.cs",
    StringEnumExtensions = "StringEnumExtensions.Template.cs",
    StringEnumSerializer = "StringEnumSerializer.Template.cs",
    StringEnumSerializerTests = "StringEnumSerializerTests.Template.cs",
    TemplateCsProj = "Template.csproj",
    TemplateTestCsProj = "Template.Test.csproj",
    TemplateTestClientCs = "TemplateTestClient.cs",
    UsingCs = "Using.cs",
    Extensions = "Extensions.cs",
    CustomProps = "Custom.props.Template",
    TestCustomProps = "Test.Custom.props.Template"
}

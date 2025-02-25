/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../../../core";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";
import * as errors from "../../../../../../errors/index";
import * as SeedExhaustive from "../../../../../index";

export declare namespace Params {
    interface Options {
        environment: core.Supplier<string>;
        token?: core.Supplier<core.BearerToken | undefined>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class Params {
    constructor(protected readonly _options: Params.Options) {}

    /**
     * GET with path param
     *
     * @param {string} param
     * @param {Params.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.params.getWithPath("param")
     */
    public async getWithPath(param: string, requestOptions?: Params.RequestOptions): Promise<string> {
        const _response = await core.fetcher({
            url: urlJoin(
                await core.Supplier.get(this._options.environment),
                `/params/path/${encodeURIComponent(param)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/exhaustive",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/exhaustive/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.endpoints.params.getWithPath.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedExhaustiveError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedExhaustiveError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedExhaustiveTimeoutError();
            case "unknown":
                throw new errors.SeedExhaustiveError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * GET with query param
     *
     * @param {SeedExhaustive.endpoints.GetWithQuery} request
     * @param {Params.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.params.getWithQuery({
     *         query: "query",
     *         number: 1
     *     })
     */
    public async getWithQuery(
        request: SeedExhaustive.endpoints.GetWithQuery,
        requestOptions?: Params.RequestOptions
    ): Promise<void> {
        const { query, number: number_ } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        _queryParams["query"] = query;
        _queryParams["number"] = number_.toString();
        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "/params"),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/exhaustive",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/exhaustive/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedExhaustiveError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedExhaustiveError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedExhaustiveTimeoutError();
            case "unknown":
                throw new errors.SeedExhaustiveError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * GET with multiple of same query param
     *
     * @param {SeedExhaustive.endpoints.GetWithMultipleQuery} request
     * @param {Params.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.params.getWithAllowMultipleQuery({
     *         query: "query",
     *         numer: 1
     *     })
     */
    public async getWithAllowMultipleQuery(
        request: SeedExhaustive.endpoints.GetWithMultipleQuery,
        requestOptions?: Params.RequestOptions
    ): Promise<void> {
        const { query, numer } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (Array.isArray(query)) {
            _queryParams["query"] = query.map((item) => item);
        } else {
            _queryParams["query"] = query;
        }

        if (Array.isArray(numer)) {
            _queryParams["numer"] = numer.map((item) => item.toString());
        } else {
            _queryParams["numer"] = numer.toString();
        }

        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "/params"),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/exhaustive",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/exhaustive/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedExhaustiveError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedExhaustiveError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedExhaustiveTimeoutError();
            case "unknown":
                throw new errors.SeedExhaustiveError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * GET with path and query params
     *
     * @param {string} param
     * @param {SeedExhaustive.endpoints.GetWithPathAndQuery} request
     * @param {Params.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.params.getWithPathAndQuery("param", {
     *         query: "query"
     *     })
     */
    public async getWithPathAndQuery(
        param: string,
        request: SeedExhaustive.endpoints.GetWithPathAndQuery,
        requestOptions?: Params.RequestOptions
    ): Promise<void> {
        const { query } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        _queryParams["query"] = query;
        const _response = await core.fetcher({
            url: urlJoin(
                await core.Supplier.get(this._options.environment),
                `/params/path-query/${encodeURIComponent(param)}`
            ),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/exhaustive",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/exhaustive/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedExhaustiveError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedExhaustiveError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedExhaustiveTimeoutError();
            case "unknown":
                throw new errors.SeedExhaustiveError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * PUT to update with path param
     *
     * @param {string} param
     * @param {string} request
     * @param {Params.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.endpoints.params.modifyWithPath("param", "string")
     */
    public async modifyWithPath(
        param: string,
        request: string,
        requestOptions?: Params.RequestOptions
    ): Promise<string> {
        const _response = await core.fetcher({
            url: urlJoin(
                await core.Supplier.get(this._options.environment),
                `/params/path/${encodeURIComponent(param)}`
            ),
            method: "PUT",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/exhaustive",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/exhaustive/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.endpoints.params.modifyWithPath.Request.jsonOrThrow(request, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.endpoints.params.modifyWithPath.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedExhaustiveError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedExhaustiveError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedExhaustiveTimeoutError();
            case "unknown":
                throw new errors.SeedExhaustiveError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}

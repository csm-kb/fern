/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.exhaustive.resources.reqwithheaders;

import com.seed.exhaustive.core.ClientOptions;
import com.seed.exhaustive.core.CustomApiException;
import com.seed.exhaustive.core.CustomException;
import com.seed.exhaustive.core.MediaTypes;
import com.seed.exhaustive.core.ObjectMappers;
import com.seed.exhaustive.core.RequestOptions;
import com.seed.exhaustive.resources.reqwithheaders.requests.ReqWithHeaders;
import java.io.IOException;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class ReqWithHeadersClient {
    protected final ClientOptions clientOptions;

    public ReqWithHeadersClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
    }

    public void getWithCustomHeader(ReqWithHeaders request) {
        getWithCustomHeader(request, null);
    }

    public void getWithCustomHeader(ReqWithHeaders request, RequestOptions requestOptions) {
        HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl())
                .newBuilder()
                .addPathSegments("test-headers")
                .addPathSegments("custom-header")
                .build();
        RequestBody body;
        try {
            body = RequestBody.create(
                    ObjectMappers.JSON_MAPPER.writeValueAsBytes(request.getBody()), MediaTypes.APPLICATION_JSON);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Request.Builder _requestBuilder = new Request.Builder()
                .url(httpUrl)
                .method("POST", body)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .addHeader("Content-Type", "application/json");
        _requestBuilder.addHeader("X-TEST-SERVICE-HEADER", request.getXTestServiceHeader());
        _requestBuilder.addHeader("X-TEST-ENDPOINT-HEADER", request.getXTestEndpointHeader());
        Request okhttpRequest = _requestBuilder.build();
        OkHttpClient client = clientOptions.httpClient();
        if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
            client = clientOptions.httpClientWithTimeout(requestOptions);
        }
        try (Response response = client.newCall(okhttpRequest).execute()) {
            ResponseBody responseBody = response.body();
            if (response.isSuccessful()) {
                return;
            }
            String responseBodyString = responseBody != null ? responseBody.string() : "{}";
            throw new CustomApiException(
                    "Error with status code " + response.code(),
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
        } catch (IOException e) {
            throw new CustomException("Network error executing HTTP request", e);
        }
    }
}
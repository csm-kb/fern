/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.codeSamples.resources.service;

import com.seed.codeSamples.core.ApiError;
import com.seed.codeSamples.core.ClientOptions;
import com.seed.codeSamples.core.MediaTypes;
import com.seed.codeSamples.core.ObjectMappers;
import com.seed.codeSamples.core.RequestOptions;
import com.seed.codeSamples.resources.service.requests.MyRequest;
import com.seed.codeSamples.resources.service.types.MyResponse;
import java.io.IOException;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ServiceClient {
    protected final ClientOptions clientOptions;

    public ServiceClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
    }

    public MyResponse hello(MyRequest request) {
        return hello(request, null);
    }

    public MyResponse hello(MyRequest request, RequestOptions requestOptions) {
        HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl())
                .newBuilder()
                .addPathSegments("hello")
                .build();
        RequestBody body;
        try {
            body = RequestBody.create(
                    ObjectMappers.JSON_MAPPER.writeValueAsBytes(request), MediaTypes.APPLICATION_JSON);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Request okhttpRequest = new Request.Builder()
                .url(httpUrl)
                .method("POST", body)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .addHeader("Content-Type", "application/json")
                .build();
        try {
            OkHttpClient client = clientOptions.httpClient();
            if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
                client = clientOptions.httpClientWithTimeout(requestOptions);
            }
            Response response = client.newCall(okhttpRequest).execute();
            if (response.isSuccessful()) {
                return ObjectMappers.JSON_MAPPER.readValue(response.body().string(), MyResponse.class);
            }
            throw new ApiError(
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(response.body().string(), Object.class));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
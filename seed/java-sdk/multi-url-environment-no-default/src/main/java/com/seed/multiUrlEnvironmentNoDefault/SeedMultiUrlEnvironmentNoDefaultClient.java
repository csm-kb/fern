/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.multiUrlEnvironmentNoDefault;

import com.seed.multiUrlEnvironmentNoDefault.core.ClientOptions;
import com.seed.multiUrlEnvironmentNoDefault.core.Suppliers;
import com.seed.multiUrlEnvironmentNoDefault.resources.ec2.Ec2Client;
import com.seed.multiUrlEnvironmentNoDefault.resources.s3.S3Client;
import java.util.function.Supplier;

public class SeedMultiUrlEnvironmentNoDefaultClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<Ec2Client> ec2Client;

    protected final Supplier<S3Client> s3Client;

    public SeedMultiUrlEnvironmentNoDefaultClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.ec2Client = Suppliers.memoize(() -> new Ec2Client(clientOptions));
        this.s3Client = Suppliers.memoize(() -> new S3Client(clientOptions));
    }

    public Ec2Client ec2() {
        return this.ec2Client.get();
    }

    public S3Client s3() {
        return this.s3Client.get();
    }

    public static SeedMultiUrlEnvironmentNoDefaultClientBuilder builder() {
        return new SeedMultiUrlEnvironmentNoDefaultClientBuilder();
    }
}
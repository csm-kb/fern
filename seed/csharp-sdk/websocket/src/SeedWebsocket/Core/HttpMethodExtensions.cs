using System.Net.Http;

namespace SeedWebsocket.Core;

public static class HttpMethodExtensions
{
    public static readonly HttpMethod Patch = new("PATCH");
}
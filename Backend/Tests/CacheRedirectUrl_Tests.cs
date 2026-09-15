using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Tests;

public class CacheRedirectUrl_Tests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly WebApplicationFactory<Program> _factory;

    public CacheRedirectUrl_Tests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetRedirectURL_ReturnsCachedUrl()
    {
        const string code = "cache-only-test";
        const string longUrl = "https://example.com/cached";
        var cache = _factory.Services.GetRequiredService<IUrlCacheService>();

        await cache.SetRedirectUrlAsync(code, longUrl, TimeSpan.FromMinutes(1));

        try
        {
            var response = await _client.GetAsync(
                $"/api/urls/{code}",
                TestContext.Current.CancellationToken);

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<RedirectUrl>(
                TestContext.Current.CancellationToken);

            Assert.NotNull(result);
            Assert.Equal(longUrl, result.LongUrl);
        }
        finally
        {
            await cache.RemoveAsync(code);
        }
    }
}
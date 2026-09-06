using System.Net.Http.Json;

using Microsoft.AspNetCore.Mvc.Testing;

namespace Tests;

public class QrCodeController_Tests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public QrCodeController_Tests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Post_ReturnsQrCodeFromQrCodeApi()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new QrCodeRequest("https://megu.url", "LOW"),
            TestContext.Current.CancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.True(result.Size > 0);
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    private sealed record QrCodeRequest(string Data, string ErrorCorrection);

    private sealed record QrCodeResponse(int Size, string Matrix);
}
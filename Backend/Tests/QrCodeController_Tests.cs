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
    public async Task Post_ReturnsSuccessfulResponse()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { data = "https://megu.url", error_correction = "LOW" },
            TestContext.Current.CancellationToken);

        Assert.True(
            response.IsSuccessStatusCode,
            $"Status: {(int)response.StatusCode} {response.StatusCode}");
    }

    [Fact]
    public async Task Post_ReturnsQrCodeFromQrCodeApi()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { data = "https://megu.url", error_correction = "LOW" },
            TestContext.Current.CancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.True(result.Size > 0, $"Results size: {result.Size}");
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    [Fact]
    public async Task Post_ReturnsInvalidErrorCorrectionResponse()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { Data = "https://megu.url", ErrorCorrection = "Invalid" },
            TestContext.Current.CancellationToken);

        Assert.False(response.IsSuccessStatusCode);

        var error = await response.Content.ReadFromJsonAsync<HTTPValidationError>(TestContext.Current.CancellationToken);

        Assert.NotNull(error);

        Assert.Equal("Input should be 'LOW', 'MEDIUM', 'QUARTILE' or 'HIGH'", error.Detail[0].Msg);
    }
}
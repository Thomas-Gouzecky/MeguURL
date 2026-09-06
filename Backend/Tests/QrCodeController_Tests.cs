using System.Net.Http.Json;

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualBasic;

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
            new QrCodeRequest("https://megu.url", "LOW"),
            TestContext.Current.CancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.True(
            response.IsSuccessStatusCode,
            $"Status: {(int)response.StatusCode} {response.StatusCode}\nBody: {result}");
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
        Assert.True(result.Size > 0, $"Results size: {result.Size}");
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    private sealed record QrCodeRequest(string Data, string? ErrorCorrection);

    private sealed record QrCodeResponse(int Size, string Matrix);
    private sealed record HTTPValidationError(List<ValidationError> Detail);
    private record ValidationError(List<object> Loc, string Msg, string Type, object? Input, object? Ctx);
}
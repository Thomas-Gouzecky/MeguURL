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

    [Theory]
    [InlineData("LOW")]
    [InlineData("MEDIUM")]
    [InlineData("QUARTILE")]
    [InlineData("HIGH")]
    public async Task Post_AcceptsSupportedErrorCorrection(string errorCorrection)
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { data = "https://megu.url", error_correction = errorCorrection },
            TestContext.Current.CancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.True(result.Size > 0);
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    [Fact]
    public async Task Post_UsesDefaultErrorCorrectionWhenOmitted()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { data = "https://megu.url" },
            TestContext.Current.CancellationToken);

        var body = await response.Content.ReadAsStringAsync(TestContext.Current.CancellationToken);
        Assert.True(
            response.IsSuccessStatusCode,
            $"Status: {response.StatusCode}\nResponse: {body}");

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.True(result.Size > 0);
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public async Task Post_RejectsBlankData(string data)
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { data, error_correction = "LOW" },
            TestContext.Current.CancellationToken);

        Assert.Equal(System.Net.HttpStatusCode.UnprocessableEntity, response.StatusCode);

        var error = await response.Content.ReadFromJsonAsync<HTTPValidationError>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(error);
        Assert.NotEmpty(error.Detail);
    }

    [Fact]
    public async Task Post_RejectsMissingData()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { error_correction = "LOW" },
            TestContext.Current.CancellationToken);

        Assert.Equal(System.Net.HttpStatusCode.UnprocessableEntity, response.StatusCode);
    }

    [Fact]
    public async Task Post_ReturnsAllValidationErrors()
    {
        var response = await _client.PostAsJsonAsync(
            "/api/qrcode",
            new { data = "", error_correction = "Invalid" },
            TestContext.Current.CancellationToken);

        Assert.Equal(System.Net.HttpStatusCode.UnprocessableEntity, response.StatusCode);

        var error = await response.Content.ReadFromJsonAsync<HTTPValidationError>(TestContext.Current.CancellationToken);

        Assert.NotNull(error);

        Assert.Equal(2, error.Detail.Count);
        Assert.Contains(error.Detail, detail =>
            detail.Msg == "String should have at least 1 character");
        Assert.Contains(error.Detail, detail =>
            detail.Msg == "Input should be 'LOW', 'MEDIUM', 'QUARTILE' or 'HIGH'");
    }
}
using System.Net;
using System.Net.Http.Json;

namespace Tests;

public class QrCodeApi_Tests : IDisposable
{
    private readonly HttpClient _client = new()
    {
        BaseAddress = new Uri("http://localhost:8001")
    };

    [Fact]
    public async Task Test_SuccessfulResponse()
    {
        var response = await _client.PostAsJsonAsync(
            "/qrcode/",
            new { data = "https://example.com" },
            TestContext.Current.CancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.True(result.Size > 0);
        Assert.NotEmpty(result.Matrix);
    }

    [Fact]
    public async Task Test_CorrectMatrixString()
    {
        var testData = new MeguURL();

        var response = await _client.PostAsJsonAsync(
            "/qrcode/",
            new { data = testData.urlString },
            cancellationToken: TestContext.Current.CancellationToken);

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.Equal(testData.matrixString, result.Matrix);
        Assert.Equal(testData.size * testData.size, result.Matrix.Length);
    }

    [Fact]
    public async Task Test_CorrectSizeResponse() 
    { 
        var testData = new MeguURL();

        var response = await _client.PostAsJsonAsync(
            "/qrcode/",
            new { data = testData.urlString },
            cancellationToken: TestContext.Current.CancellationToken);

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.Equal(testData.size, result.Size);
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    [Theory]
    [InlineData("LOW")]
    [InlineData("MEDIUM")]
    [InlineData("QUARTILE")]
    [InlineData("HIGH")]
    public async Task Test_SupportedErrorCorrectionLevels(string errorCorrection)
    {
        var response = await _client.PostAsJsonAsync(
            "/qrcode/",
            new { data = "https://example.com", error_correction = errorCorrection },
            TestContext.Current.CancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>(
            TestContext.Current.CancellationToken);

        Assert.NotNull(result);
        Assert.True(result.Size > 0);
        Assert.Equal(result.Size * result.Size, result.Matrix.Length);
    }

    [Fact]
    public async Task Test_InvalidErrorCorrectionReturnsUnprocessableEntity()
    {
        var response = await _client.PostAsJsonAsync(
            "/qrcode/",
            new { data = "https://example.com", error_correction = "INVALID" },
            TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.UnprocessableEntity, response.StatusCode);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public async Task Test_BlankDataReturnsUnprocessableEntity(string data)
    {
        var response = await _client.PostAsJsonAsync(
            "/qrcode/",
            new { data },
            TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.UnprocessableEntity, response.StatusCode);
    }

    public void Dispose()
    {
        _client.Dispose();
    }

    private sealed record QrCodeResponse(int Size, string Matrix);
}
using Backend.Attributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;

namespace Backend.Controllers;

[ApiController]
[Route("/api/qrcode")]
[RequiredService("QrCode")]
public class QrCodeController : ControllerBase
{
    private readonly HttpClient _qrCodeApi;

    public QrCodeController(IHttpClientFactory httpClientFactory)
    {
        _qrCodeApi = httpClientFactory.CreateClient("QrCodeApi");
    }

    [HttpPost]
    public async Task<IActionResult> CreateQrCode([FromBody] QrCodeRequest request)
    {
        var response = await _qrCodeApi.PostAsJsonAsync("/qrcode/", request);

        var result = await response.Content.ReadFromJsonAsync<QrCodeResponse>();

        return Ok(result);
    }
}
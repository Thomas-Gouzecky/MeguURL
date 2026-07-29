using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/urls")]
public class UrlController : ControllerBase
{
    private readonly HttpClient _http;
    private readonly UrlCodeService _urlCodeService;

    public UrlController(IHttpClientFactory httpClientFactory)
    {
        _http = httpClientFactory.CreateClient("DatabaseApi");
        _urlCodeService = new();
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAllUrls()
    {
        var response = await _http.GetAsync("db/");

        if (!response.IsSuccessStatusCode)
            return NotFound();

        return Ok(await response.Content.ReadFromJsonAsync<UrlMapping[]>());
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody] CreateUrlRequest request)
    {
        var response = await _http.PostAsJsonAsync("db/", request);

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode);
        }

        var result = await response.Content.ReadFromJsonAsync<UrlMapping>();

        if (result == null)
        {
            return StatusCode(500, "Failed to create URL");
        }

        string code = _urlCodeService.Encode(result.Id);

        return Ok(new CreateUrlResponse
        {
            Code = code,
            ShortUrl = $"https://megu.url/{code}"
        });
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetRedirectURL(string code)
    {
        int id = _urlCodeService.Decode(code);

        var response = await _http.GetAsync($"db/{id}");

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode);
        }

        var result = await response.Content.ReadFromJsonAsync<RedirectUrl>();

        if (result == null)
            return NotFound();

        return Ok(result);
    }
}
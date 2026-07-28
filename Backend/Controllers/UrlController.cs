using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/urls")]
public class UrlController : ControllerBase
{
    private readonly HttpClient _http;

    public UrlController(HttpClient http)
    {
        _http = http;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAllUrls()
    {
        var response = await _http.GetAsync($"http://localhost:8000/db/");

        if (!response.IsSuccessStatusCode)
            return NotFound();

        return Ok(await response.Content.ReadFromJsonAsync<UrlMapping[]>());
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody] CreateUrlRequest request)
    {
        var response = await _http.PostAsJsonAsync($"http://localhost:8000/db/", request);

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode);
        }

        var result = await response.Content.ReadFromJsonAsync<UrlMapping>();

        return Ok(result);
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetRedirectURL(string code)
    {
        var response = await _http.GetAsync($"http://localhost:8000/db/{code}");

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
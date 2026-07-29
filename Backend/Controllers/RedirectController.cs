using backend.Components.Pages;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
public class RedirectController : ControllerBase
{
    private readonly HttpClient _http;

    public RedirectController(IHttpClientFactory httpClientFactory)
    {
        _http = httpClientFactory.CreateClient("BackendApi");
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetRedirectURL(string code)
    {
        var response = await _http.GetAsync($"api/urls/{code}");

        // Redirect to a 404 not found page?
        if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
            return Redirect("/error");

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode);
        }

        var result = await response.Content.ReadFromJsonAsync<RedirectUrl>();

        if (result == null)
            return NotFound();

        return Redirect(result.LongUrl);
    }
}
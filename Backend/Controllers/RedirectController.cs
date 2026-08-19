using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;


namespace Backend.Controllers;

[ApiController]
public class RedirectController : ControllerBase
{
    private readonly HttpClient _backendApi;

    public RedirectController(IHttpClientFactory httpClientFactory)
    {
        _backendApi = httpClientFactory.CreateClient("BackendApi");
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpGet("{code}")]
    public async Task<IActionResult> GetRedirectURL(string code)
    {
        var response = await _backendApi.GetAsync($"/api/urls/{code}");

        if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
            return Redirect("/error");

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return Redirect("/404");

        if (!response.IsSuccessStatusCode)
        {
            var problem = new ProblemDetails
            {
                Status = (int)response.StatusCode,
                Title = response.StatusCode.GetDisplayName(),
                Detail = response.ReasonPhrase
            };

            return StatusCode((int)response.StatusCode, problem);
        }

        var result = await response.Content.ReadFromJsonAsync<RedirectUrl>();

        if (result == null)
            return NotFound();

        return Redirect(result.LongUrl);
    }
}
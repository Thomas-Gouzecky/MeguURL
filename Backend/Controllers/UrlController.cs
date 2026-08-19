using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;

namespace Backend.Controllers;

[ApiController]
[Route("/api/urls")]
public class UrlController : ControllerBase
{
    private readonly HttpClient _databaseApi;
    private readonly UrlCodeService _urlCodeService;
    private readonly IConfiguration _configuration;
    private readonly ValidationService _validationService;

    public UrlController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        UrlCodeService urlCodeService,
        ValidationService validationService
    )
    {
        _databaseApi = httpClientFactory.CreateClient("DatabaseApi");
        _configuration = configuration;
        _urlCodeService = urlCodeService;
        _validationService = validationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUrls()
    {
        var response = await _databaseApi.GetAsync("/db/");

        var error = CheckResponseError(response);

        if (error is not null)
            return error;

        var result = await response.Content.ReadFromJsonAsync<UrlMapping[]>();

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateUrlRequest request)
    {

        UrlValidationResponse validationResponse = await _validationService.IsValidUrl(request.LongUrl);

        if (!validationResponse.IsValid)
        {
            var problem = new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Invalid URL",
                Detail = "The provided URL is invalid."
            };
            
            return BadRequest(problem);
        }

        request.LongUrl = validationResponse.NormalizedUrl!;

        var response = await _databaseApi.PostAsJsonAsync("/db/", request);

        var error = CheckResponseError(response);

        if (error is not null)
            return error;

        var result = await response.Content.ReadFromJsonAsync<UrlMapping>();

        if (result == null)
        {
            return StatusCode(500, "Failed to create URL");
        }

        string code = _urlCodeService.Encode(result.Id);
        var baseUrl = _configuration["ApiSettings:BackendApi"];

        return Ok(new CreateUrlResponse
        {
            Code = code,
            ShortUrl = $"{baseUrl}/{code}"
        });
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetRedirectURL(string code)
    {
        int id = _urlCodeService.Decode(code);

        var response = await _databaseApi.GetAsync($"/db/{id}");

        var error = CheckResponseError(response);

        if (error is not null)
            return error;

        var result = await response.Content.ReadFromJsonAsync<RedirectUrl>();

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    private IActionResult? CheckResponseError(HttpResponseMessage? response)
    {
        if (response is null)
            return NotFound();

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

        return null;
    }
}
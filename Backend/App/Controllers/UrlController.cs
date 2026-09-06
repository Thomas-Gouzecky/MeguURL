using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;
using Backend.Attributes;

namespace Backend.Controllers;

[ApiController]
[Route("/api/urls")]
[RequiredService("Database")]
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
    [ProducesResponseType(typeof(UrlMapping[]), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
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
    [ProducesResponseType(typeof(CreateUrlResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(InvalidUrlProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post([FromBody] CreateUrlRequest request)
    {

        UrlValidationResponse validationResponse = await _validationService.IsValidUrl(request.LongUrl);

        if (!validationResponse.IsValid)
        {
            InvalidUrlResponse invalidUrlResponse = validationResponse.InvalidUrlResponse!;
            if (invalidUrlResponse is null)
            {
                return BadRequest(new InvalidUrlProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Invalid URL",
                    Detail = "The URL validation failed."
                });
            }

            var problem = new InvalidUrlProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = invalidUrlResponse.Title,
                Detail = invalidUrlResponse.Message,
                url = invalidUrlResponse.Url
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
            return StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "Failed to create URL",
                Detail = "The URL could not be created."
            });
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
    [ProducesResponseType(typeof(RedirectUrl), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
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
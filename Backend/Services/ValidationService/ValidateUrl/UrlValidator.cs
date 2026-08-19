public class UrlValidator : IValidateBase<UrlValidationResponse>
{

    private readonly HttpClient _httpClient;

    public UrlValidator(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient("UrlValidator");
    }

    public async Task<UrlValidationResponse> Validate(object context)
    {

        if (context is not string url || string.IsNullOrWhiteSpace(url))
        {
            return new UrlValidationResponse
            {
                IsValid = false,
                InvalidUrlResponse = new InvalidUrlResponse
                {
                    Title = "Missing URL",
                    Message = "Please provide a URL to shorten.",
                }
            };
        }

        var (isNormalizedUrlValid, normalizedUrl) = IsNormalizedUrlValid(url);

        if (!isNormalizedUrlValid)
        {
            return new UrlValidationResponse
            {
                IsValid = false,
                InvalidUrlResponse = new InvalidUrlResponse
                {
                    Title = "Invalid URL",
                    Message = "Please provide a valid URL to shorten.",
                    Url = url
                }
            };
        }

        var doesUrlExist = await UrlExists(normalizedUrl);

        if (!doesUrlExist)
        {
            return new UrlValidationResponse
            {
                IsValid = false,
                InvalidUrlResponse = new InvalidUrlResponse
                {
                    Title = "URL Does Not Exist",
                    Message = $"'{url}' does not currently exist. Please provide a valid URL.",
                    Url = url
                }
            };
        }

        return new UrlValidationResponse
        {
            IsValid = true,
            NormalizedUrl = normalizedUrl
        };
    }

    public (bool, string) IsNormalizedUrlValid(string url)
    {
        string normalizedUrl = url;

        if (!normalizedUrl.StartsWith("http://") &&
            !normalizedUrl.StartsWith("https://"))
        {
            normalizedUrl = "https://" + normalizedUrl;
        }

        return (Uri.TryCreate(normalizedUrl, UriKind.Absolute, out var uri) &&
                (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps), normalizedUrl);
    }
    
    public async Task<bool> UrlExists(string url)
    {
        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Head, url);
            using var response = await _httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
                return true;

            if (response.StatusCode == System.Net.HttpStatusCode.MethodNotAllowed)
            {
                using var getResponse = await _httpClient.GetAsync(
                    url,
                    HttpCompletionOption.ResponseHeadersRead);

                return getResponse.IsSuccessStatusCode;
            }

            return false;
        }
        catch (HttpRequestException)
        {
            return false;
        }
    }
}
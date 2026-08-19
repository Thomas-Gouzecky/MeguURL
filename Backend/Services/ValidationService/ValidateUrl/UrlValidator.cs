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
            return new UrlValidationResponse { IsValid = false };
        }

        var (isNormalizedUrlValid, normalizedUrl) = IsNormalizedUrlValid(url);
        bool doesUrlExists = await UrlExists(normalizedUrl);

        return new UrlValidationResponse { IsValid = isNormalizedUrlValid && doesUrlExists, NormalizedUrl = normalizedUrl };
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
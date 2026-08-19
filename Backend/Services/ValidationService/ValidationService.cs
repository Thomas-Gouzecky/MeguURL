public class ValidationService
{
    private readonly UrlValidator _urlValidator;
    public ValidationService(UrlValidator urlValidator)
    {
        _urlValidator = urlValidator;
    }

    public async Task<UrlValidationResponse> IsValidUrl(string url)
    {
        return await _urlValidator.Validate(url);
    }

    public (bool, string) IsNormalizedUrlValid(string url)
    {
        return _urlValidator.IsNormalizedUrlValid(url);
    }
}
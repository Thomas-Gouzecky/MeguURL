using System.Data;

public class ValidationService
{
    private readonly UrlValidator _urlValidator;
    public ValidationService()
    {
        _urlValidator = new();
    }

    public bool IsValidUrl(string url)
    {
        return _urlValidator.Validate(url);
    }
}
using System.Data;
using Microsoft.VisualBasic;

public class ValidationService
{
    private readonly UrlValidator _urlValidator;
    public ValidationService()
    {
        _urlValidator = new();
    }

    public UrlValidationResponse IsValidUrl(string url)
    {
        return _urlValidator.Validate(url);
    }
}
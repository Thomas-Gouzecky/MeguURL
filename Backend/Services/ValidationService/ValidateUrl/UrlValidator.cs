public class UrlValidator : IValidateBase<UrlValidationResponse>
{
    public UrlValidationResponse Validate(object context)
    {

        if (context is not string url || string.IsNullOrWhiteSpace(url))
        {
            return new UrlValidationResponse { IsValid = false };
        }
        
        string normalizedUrl = url;

        if (!normalizedUrl.StartsWith("http://") &&
            !normalizedUrl.StartsWith("https://"))
        {
            normalizedUrl = "https://" + normalizedUrl;
        }

        bool isValid = Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
                (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);

        return new UrlValidationResponse { IsValid = isValid, NormalizedUrl = normalizedUrl };
    }
}
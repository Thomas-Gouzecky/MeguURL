public class UrlValidationResponse : IValidateResponse
{
    public bool IsValid { get; set; }
    public string? NormalizedUrl { get; set; }


}
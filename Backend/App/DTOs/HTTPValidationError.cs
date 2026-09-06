using System.Text.Json.Serialization;

public class HTTPValidationError()
{
    [JsonPropertyName("detail")]
    public required List<ValidationError> Detail { get; set; }
}
using System.Text.Json.Serialization;

public class CreateUrlRequest
{
    [JsonPropertyName("long_url")]
    public required string LongUrl { get; set; }
}
using System.Text.Json.Serialization;

public class RedirectUrl
{
    [JsonPropertyName("long_url")]
    public required string LongUrl { get; set; }
}
using System.Text.Json.Serialization;

public class CreateUrlRequest
{
    [JsonPropertyName("long_url")]
    public string LongUrl { get; set; } = "";
}
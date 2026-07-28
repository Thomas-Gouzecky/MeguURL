using System.Text.Json.Serialization;

public class UrlMapping
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    [JsonPropertyName("long_url")]
    public required string LongUrl { get; set; }
}
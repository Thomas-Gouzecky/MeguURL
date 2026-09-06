using System.Text.Json.Serialization;

public class GetUrlRequest
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
}
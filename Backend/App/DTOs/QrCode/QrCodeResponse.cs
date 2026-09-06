using System.Text.Json.Serialization;

public class QrCodeResponse
{
    [JsonPropertyName("size")]
    public int Size { get; set; }
    [JsonPropertyName("matrix")]
    public string Matrix { get; set; } = "";
}
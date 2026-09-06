using System.Text.Json.Serialization;

public class QrCodeRequest()
{
    [JsonPropertyName("data")]
    public required string Data { get; set; }
    [JsonPropertyName("error_correction")]
    public string? ErrorCorrection { get; set; }
}
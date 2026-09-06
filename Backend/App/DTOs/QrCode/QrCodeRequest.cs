using System.Text.Json.Serialization;

public class QrCodeRequest
{
    [JsonPropertyName("data")]
    public required string Data { get; set; }

    [JsonPropertyName("error_correction")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ErrorCorrection { get; set; }
}
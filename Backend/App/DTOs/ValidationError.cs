public class ValidationError()
{
    public required List<object> Loc { get; set; }
    public required string Msg { get; set; }
    public required string Type { get; set; }
    public object? Input { get; set; }
    public object? Ctx { get; set; }
}
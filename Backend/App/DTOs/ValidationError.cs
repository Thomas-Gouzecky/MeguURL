public class ValidationError()
{
    public required List<object> Loc;
    public required string Msg;
    public required string Type;
    object? Input;
    object? Ctx;
}
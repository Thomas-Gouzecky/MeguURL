public class Base62Configuration : IBase62Configuration
{
    public string Alphabet { get; } =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
}
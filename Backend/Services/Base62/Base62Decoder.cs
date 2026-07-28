public class Base62Decoder : IDecoderBase
{
    private readonly string _alphabet;
    private Dictionary<char, int> charMap = new();
        
    public Base62Decoder(IBase62Configuration config)
    {
        _alphabet = config.Alphabet;

        for (int i = 0; i < _alphabet.Length; i++)
        {
            charMap[_alphabet[i]] = i;
        }
    }

    public int Decode(string code)
    {
        code = code.Trim();
        int id = 0;

        foreach (char c in code)
        {
            id = id * 62 + charMap[c];
        }

        return id;
    }
}
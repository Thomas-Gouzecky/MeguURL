public class Base62Decoder : IDecoderBase
{
    private readonly string _alphabet;
    private Dictionary<char, int> _charMap = new();
        
    public Base62Decoder(IBase62Configuration config)
    {
        _alphabet = config.Alphabet;

        for (int i = 0; i < _alphabet.Length; i++)
        {
            _charMap[_alphabet[i]] = i;
        }
    }

    public int Decode(string code)
    {
        code = code.Trim();
        int id = 0;

        foreach (char c in code)
        {
            if (!_charMap.TryGetValue(c, out int value))
            {
                throw new ArgumentException($"Invalid Base62 character: {c}");
            }
            id = id * 62 + _charMap[c];
        }

        return id;
    }
}
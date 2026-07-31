using System.Text;

public class Base62Encoder : IEncoderBase
{
    private readonly string _alphabet;

    public Base62Encoder(IBase62Configuration config)
    {
        _alphabet = config.Alphabet;
    }

    public string Encode(int id)
    {
        if (id == 0)
            return "0";

        StringBuilder code = new();

        while (id > 0)
        {
            int remainder = id % 36;
            code.Append(_alphabet[remainder]);

            id /= 36;
        }

        return new string([.. code.ToString().Reverse()]);
    }
}
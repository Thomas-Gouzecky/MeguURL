using System.Text;

public class Base62EncodingService : IEncodingService
{
    public IEncoderBase Encoder { get; }
    public IDecoderBase Decoder { get; }
    private readonly IBase62Configuration base62Configuration = new Base62Configuration();

    public Base62EncodingService()
    {
        Encoder = new Base62Encoder(base62Configuration);
        Decoder = new Base62Decoder(base62Configuration);
    }

    public string Encode(int id)
    {
        return Encoder.Encode(id);
    }

    public int Decode(string code)
    {
        return Decoder.Decode(code);
    }
}
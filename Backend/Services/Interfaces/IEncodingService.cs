public interface IEncodingService
{
    IEncoderBase Encoder { get; }
    IDecoderBase Decoder { get; }

    string Encode(int id);
    int Decode(string code);
}
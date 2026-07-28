public class UrlCodeService
{
    private readonly IEncodingService _encodingService;
    public UrlCodeService(IEncodingService? EncodingService = null)
    {
        _encodingService = EncodingService ?? new Base62EncodingService();
    }
    
    public string Encode(int id)
    {
        return _encodingService.Encode(id);
    }

    public int Decode(string code)
    {
        return _encodingService.Decode(code);
    }
}
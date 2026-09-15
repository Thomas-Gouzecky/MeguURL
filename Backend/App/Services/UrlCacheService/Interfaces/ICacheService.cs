public interface IUrlCacheService
{
    Task<string?> GetRedirectUrlAsync(string key);
    Task SetAsync(string key, string value, TimeSpan? expiry = null);
    Task RemoveAsync(string key);
}
public interface IUrlCacheService
{
    Task<string?> GetRedirectUrlAsync(string key);
    Task SetRedirectUrlAsync(string key, string value, TimeSpan? expiry = null);
    Task RemoveAsync(string key);
    Task RefreshRedirectUrlAsync(string key, TimeSpan? expiry = null);
}
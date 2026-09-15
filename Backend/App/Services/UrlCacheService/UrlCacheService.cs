using StackExchange.Redis;

public class UrlCacheService : ICacheService
{
    private readonly IDatabase _redis;
    public UrlCacheService(IConnectionMultiplexer muxer)
    {
        _redis = muxer.GetDatabase();
    }

    public async Task<string?> GetAsync(string key)
    {
        return await _redis.StringGetAsync(key);
    }

    public Task SetAsync(string key, string value, TimeSpan? expiry = null)
    {
        return _redis.StringSetAsync(
            key,
            value,
            expiry.HasValue
                ? new Expiration(expiry.Value)
                : Expiration.Default);
    }

    public async Task RemoveAsync(string key)
    {
        await _redis.KeyDeleteAsync(key);
    }
}
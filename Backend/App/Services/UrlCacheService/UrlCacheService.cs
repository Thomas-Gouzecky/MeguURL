using StackExchange.Redis;

public class UrlCacheService : IUrlCacheService
{

    private readonly Logger<UrlCacheService> _logger;
    private readonly IDatabase _redis;
    public UrlCacheService(IConnectionMultiplexer muxer, Logger<UrlCacheService> logger)
    {
        _redis = muxer.GetDatabase();
        _logger = logger;
    }

    public async Task<string?> GetRedirectUrlAsync(string key)
    {
        string cacheKey = $"urls:redirect:{key}";

        string? value = await _redis.StringGetAsync(cacheKey);

        if (value == null)
        {
            _logger.LogWarning("Key not found in cache: {key}", key);
        }
        else
        {
            _logger.LogInformation("Key found in cache: {key}", key);
        }

        return value;
    }

    public Task SetAsync(string key, string value, TimeSpan? expiry = null)
    {
        _logger.LogInformation("Setting key in cache: {key} with expiry: {expiry}", key, expiry);
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
        _logger.LogInformation("Key removed from cache: {key}", key);
    }
}
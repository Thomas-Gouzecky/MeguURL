using StackExchange.Redis;

public class UrlCacheService : IUrlCacheService
{

    private readonly ILogger<UrlCacheService> _logger;
    private readonly IDatabase _redis;
    public UrlCacheService(IConnectionMultiplexer muxer, ILogger<UrlCacheService> logger)
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

    public Task SetRedirectUrlAsync(string key, string value, TimeSpan? expiry = null)
    {
        string cacheKey = $"urls:redirect:{key}";
        _logger.LogInformation("Setting key in cache: {key} with expiry: {expiry}", cacheKey, expiry);
        return _redis.StringSetAsync(
            cacheKey,
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

    public async Task RefreshRedirectUrlAsync(string key, TimeSpan? expiry = null)
    {
        string cacheKey = $"urls:redirect:{key}";
        var value = await _redis.StringGetAsync(cacheKey);

        if (value.HasValue)
        {
            await _redis.KeyExpireAsync(cacheKey, expiry);
            _logger.LogInformation("Key refreshed in cache: {key} with new expiry: {expiry}", cacheKey, expiry);
        }
        else
        {
            _logger.LogWarning("Attempted to refresh non-existent key in cache: {key}", cacheKey);
        }
    }
}
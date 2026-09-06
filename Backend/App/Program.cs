using backend.Components;
using Microsoft.AspNetCore.DataProtection;
using System.Security.Cryptography.X509Certificates;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddControllers();

builder.Services.AddProblemDetails();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

if (builder.Configuration.GetValue<bool>("ASPNETCORE_USE_K8S_TLS"))
{
    builder.WebHost.ConfigureKestrel(options =>
    {
        var certificate = X509Certificate2.CreateFromPemFile(
            "/certs/tls.crt",
            "/certs/tls.key"
        );

        options.ListenAnyIP(6767, listenOptions =>
        {
            listenOptions.UseHttps(certificate);
        });
    });
}

var backendApi = builder.Configuration["ApiSettings:BackendApi"]
    ?? throw new InvalidOperationException("Backend API URL is missing");

var databaseApi = builder.Configuration["ApiSettings:DatabaseApi"]
    ?? throw new InvalidOperationException("Database API URL is missing");

builder.Services.AddTransient<ApiExceptionHandler>();

builder.Services.AddHttpClient("BackendApi", client => { client.BaseAddress = new Uri(backendApi); });
builder.Services.AddHttpClient("DatabaseApi", client => { client.BaseAddress = new Uri(databaseApi); }).AddHttpMessageHandler<ApiExceptionHandler>();;
builder.Services.AddHttpClient("UrlValidator", client => { client.Timeout = TimeSpan.FromSeconds(10); });
    
builder.Services.AddSingleton<UrlCodeService>();
builder.Services.AddSingleton<UrlValidator>();
builder.Services.AddSingleton<ValidationService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("/keys"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("NextJs", policy =>
    {
        policy.WithOrigins([
                "https://megu.url",
                "https://localhost:3000",
                "http://localhost:3000"
            ])
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseExceptionHandler();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseCors("NextJs");

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.MapControllers();

app.Run();

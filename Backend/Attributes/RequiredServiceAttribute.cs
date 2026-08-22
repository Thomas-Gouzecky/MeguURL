using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Attributes;

public class RequiredServiceAttribute : ExceptionFilterAttribute
{
    private readonly string _service;

    public RequiredServiceAttribute(string service)
    {
        _service = service;
    }

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is HttpRequestException)
        {
            context.Result = new ObjectResult(new ProblemDetails
            {
                Status = StatusCodes.Status503ServiceUnavailable,
                Title = $"{_service} Unavailable",
                Detail = $"The {_service.ToLower()} could not be reached."
            })
            {
                StatusCode = StatusCodes.Status503ServiceUnavailable
            };

            context.ExceptionHandled = true;
        }
    }
}
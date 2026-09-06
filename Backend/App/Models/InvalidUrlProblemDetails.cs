using Microsoft.AspNetCore.Mvc;

public class InvalidUrlProblemDetails : ProblemDetails
{
    public string? url { get; set; }
}
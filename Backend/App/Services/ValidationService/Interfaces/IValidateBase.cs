public interface IValidateBase<T>
{
    Task<T> Validate(object context);
}
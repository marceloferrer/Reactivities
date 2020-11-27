using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty()
                .MinimumLength(6).WithMessage("Password must be at least 6 characters")
                .Matches("[A-Z]").WithMessage("Password must have at least one capital character")
                .Matches("[a-z]").WithMessage("Password must have at least one lowercase character")
                .Matches("[0-9]").WithMessage("Password must have at least one number")
                .Matches("^[a-zA-Z0-9]").WithMessage("Password must have at least one non alphanumeric character");

            return options;
        }
    }
}
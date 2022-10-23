using Library.Constants;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    public class RegisterViewModel
    {

        [Display(Name = ModelValidationConstants.Username)]
        [Required(ErrorMessage = ModelValidationConstants.RegisterUserNameRequiredError)]
        [MinLength(ModelValidationConstants.RegisterUserNameMinLength, ErrorMessage = ModelValidationConstants.RegisterUserNameMinLengthError)]
        [MaxLength(ModelValidationConstants.RegisterUserNameMaxLength, ErrorMessage = ModelValidationConstants.RegisterUserNameMaxLengthError)]
        public string UserName { get; set; } = null!;

        [Required(ErrorMessage = ModelValidationConstants.RegisterEmailRequiredError)]
        [MinLength(ModelValidationConstants.RegisterEmailMinLength, ErrorMessage = ModelValidationConstants.RegisterEmailMinLengthError)]
        [MaxLength(ModelValidationConstants.RegisterEmailMaxLength, ErrorMessage = ModelValidationConstants.RegisterEmailMaxLengthError)] 
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = ModelValidationConstants.RegisterPasswordRequiredError)]
        [MinLength(ModelValidationConstants.RegisterPasswordMinLength, ErrorMessage = ModelValidationConstants.RegisterPasswordMinLengthError)]
        [MaxLength(ModelValidationConstants.RegisterPasswordMaxLength, ErrorMessage = ModelValidationConstants.RegisterPasswordMaxLengthError)]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        [Compare(nameof(Password))]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; } = null!;
    }
}

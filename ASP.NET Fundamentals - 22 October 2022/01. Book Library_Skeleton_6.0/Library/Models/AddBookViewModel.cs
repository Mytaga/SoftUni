using Library.Constants;
using Library.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    public class AddBookViewModel
    {
        [Required(ErrorMessage = ModelValidationConstants.BookTitleRequiredError)]
        [MinLength(ModelValidationConstants.BookTitleMinLength, ErrorMessage = ModelValidationConstants.BookTitleMinLengthError)]
        [MaxLength(ModelValidationConstants.BookTitleMaxLength, ErrorMessage = ModelValidationConstants.BookTitleMaxLengthError)]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = ModelValidationConstants.BookAuthorRequiredError)]
        [MinLength(ModelValidationConstants.BookAuthorMinLength, ErrorMessage = ModelValidationConstants.BookAuthorMinLengthError)]
        [MaxLength(ModelValidationConstants.BookAuthorMaxLength, ErrorMessage = ModelValidationConstants.BookAuthorMaxLengthError)]
        public string Author { get; set; } = null!;

        [Required(ErrorMessage = ModelValidationConstants.BookDescriptionRequiredError)]
        [MinLength(ModelValidationConstants.BookDescriptionMinLength, ErrorMessage = ModelValidationConstants.BookDescriptionMinLengthError)]
        [MaxLength(ModelValidationConstants.BookDescriptionMaxLength, ErrorMessage = ModelValidationConstants.BookDescriptionMaxLengthError)]
        public string Description { get; set; } = null!;
        
        [Required(ErrorMessage = ModelValidationConstants.BookImageUrlRequiredError)]
        public string ImageUrl { get; set; } = null!;

        [Required(ErrorMessage = ModelValidationConstants.BookRatingRequiredError)]
        [Range(typeof(decimal), ModelValidationConstants.BookRatingMinValue, ModelValidationConstants.BookRatingMaxValue, ConvertValueInInvariantCulture = true
            , ErrorMessage = ModelValidationConstants.BookRatingRangeError)]
        public decimal Rating { get; set; }

        public int CategoryId { get; set; }

        public IEnumerable<Category> Categories { get; set; } = new HashSet<Category>();
    }
}

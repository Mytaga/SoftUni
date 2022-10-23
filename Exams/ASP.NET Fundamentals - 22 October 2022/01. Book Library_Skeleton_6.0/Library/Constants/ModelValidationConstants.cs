namespace Library.Constants
{
    public static class ModelValidationConstants
    {
        public const int BookTitleMinLength = 10;
        public const int BookTitleMaxLength = 50;
        public const int BookAuthorMinLength = 5;
        public const int BookAuthorMaxLength = 50;
        public const int BookDescriptionMinLength = 5;
        public const int BookDescriptionMaxLength = 5000;
        public const string BookRatingMinValue = "0.00";
        public const string BookRatingMaxValue = "10.00";

        public const int CategoryNameMaxLength = 50;

        public const int RegisterUserNameMinLength = 5;
        public const int RegisterUserNameMaxLength = 20;

        public const int RegisterEmailMinLength = 10;
        public const int RegisterEmailMaxLength = 60;

        public const int RegisterPasswordMinLength = 5;
        public const int RegisterPasswordMaxLength = 20;

        public const string BookTitleRequiredError = "Title is required";
        public const string BookTitleMinLengthError = "Title must be at least 10 symbols";
        public const string BookTitleMaxLengthError = "Title must be no more than 50 symbols";
        public const string BookAuthorRequiredError = "Author is required";
        public const string BookAuthorMinLengthError = "Author must be at least 5 symbols";
        public const string BookAuthorMaxLengthError = "Author must be no more than 50 symbols";
        public const string BookDescriptionRequiredError = "Description is required";
        public const string BookDescriptionMinLengthError = "Description must be at least 5 symbols";
        public const string BookDescriptionMaxLengthError = "Description must be no more than 5000 symbols";
        public const string BookImageUrlRequiredError = "Image URL is required";
        public const string BookRatingRequiredError = "Rating is required";
        public const string BookRatingRangeError = "Rating must be between 0.00 and 10.00";
       

        public const string RegisterUserNameRequiredError = "Username is required";
        public const string RegisterUserNameMinLengthError = "Username must be at least 5 symbols";
        public const string RegisterUserNameMaxLengthError = "Username must be no more than 20 symbols";
        public const string RegisterEmailRequiredError = "Email is required";
        public const string RegisterEmailMinLengthError = "Email must be at least 10 symbols";
        public const string RegisterEmailMaxLengthError = "Email must be no more than 60 symbols";
        public const string RegisterPasswordRequiredError = "Password is required";
        public const string RegisterPasswordMinLengthError = "Password must be at least 5 symbols";
        public const string RegisterPasswordMaxLengthError = "Password must be no more than 20 symbols";

        public const string Username = "Username";
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Data.Models
{
    public class ApplicationUserBook
    {
        [Required]
        [ForeignKey(nameof(User))]
        public string ApplicationUserId { get; set; } = null!;

        [Required]
        public ApplicationUser User { get; set; } = null!;

        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }

        [Required]
        public Book Book { get; set; } = null!;
    }
}
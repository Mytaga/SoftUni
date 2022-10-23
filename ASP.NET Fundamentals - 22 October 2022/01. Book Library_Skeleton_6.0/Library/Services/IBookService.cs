using Library.Data.Models;
using Library.Models;

namespace Library.Services
{
    public interface IBookService
    {
        Task<IEnumerable<BookViewModel>> GetAllAsync();

        Task<IEnumerable<Category>> GetCategoriesAsync();

        Task AddBookAsync(AddBookViewModel book);

        Task AddBookToCollectionAsync(int bookId, string userId);

        Task<IEnumerable<BookViewModel>> GetMineAsync(string userId);

        Task RemoveFromCollectionAsync(int bookId, string userId);
    }
}

using Library.Constants;
using Library.Data;
using Library.Data.Models;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext dbContext;

        public BookService(LibraryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddBookAsync(AddBookViewModel book)
        {
            var model = new Book()
            {
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                ImageUrl = book.ImageUrl,
                Rating = book.Rating,
                CategoryId = book.CategoryId,
            };

            await this.dbContext.Books.AddAsync(model);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task AddBookToCollectionAsync(int bookId, string userId)
        {
            var user = await this.dbContext.Users
                .Where(u => u.Id == userId)
                .Include(u => u.ApplicationUsersBooks)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException(ExceptionErrors.InvalidUser);
            }

            var book = await this.dbContext.Books.FirstOrDefaultAsync(m => m.Id == bookId);

            if (book == null)
            {
                throw new ArgumentException(ExceptionErrors.InvalidBook);
            }

            if (!user.ApplicationUsersBooks.Any(b => b.BookId == bookId))
            {
                user.ApplicationUsersBooks.Add(new ApplicationUserBook()
                {
                    ApplicationUserId = user.Id,
                    BookId = book.Id,
                    User = user,
                    Book = book,
                });

                await this.dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<BookViewModel>> GetAllAsync()
        {
            return await this.dbContext.Books
               .Select(m => new BookViewModel()
               {
                   Id = m.Id,
                   Title = m.Title,
                   Author = m.Author,
                   ImageUrl = m.ImageUrl,
                   Rating = m.Rating.ToString(),
                   Category = m.Category.Name,
               })
               .ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await this.dbContext.Categories.ToListAsync();
        }

        public async Task<IEnumerable<BookViewModel>> GetMineAsync(string userId)
        {
            var user = await this.dbContext.Users
                .Where(u => u.Id == userId)
                .Include(u => u.ApplicationUsersBooks)
                .ThenInclude(ub => ub.Book)
                .ThenInclude(m => m.Category)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException(ExceptionErrors.InvalidUser);
            }

            return user.ApplicationUsersBooks.Select(b => new BookViewModel()
            {
                Title = b.Book.Title,
                Author = b.Book.Author,
                Description = b.Book.Description,
                ImageUrl = b.Book.ImageUrl,
                Category = b.Book.Category.Name,
                Id = b.BookId,
                Rating = b.Book.Rating.ToString(),
            });
        }

        public async Task RemoveFromCollectionAsync(int bookId, string userId)
        {
            var user = await this.dbContext.Users
                .Where(u => u.Id == userId)
                .Include(u => u.ApplicationUsersBooks)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException(ExceptionErrors.InvalidUser);
            }

            var book = user.ApplicationUsersBooks.FirstOrDefault(b => b.BookId == bookId);

            if (book != null)
            {
                user.ApplicationUsersBooks.Remove(book);
                await this.dbContext.SaveChangesAsync();
            }
        }
    }
}

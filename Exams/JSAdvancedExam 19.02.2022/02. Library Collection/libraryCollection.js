class LibraryCollection{
    constructor(capacity){
        this.capacity = capacity;
        this.books = [];
    };

    addBook (bookName, bookAuthor){
        if (this.books.length >= this.capacity){
            throw new Error('Not enough space in the collection.');
        }

        let book = {
            name: bookName,
            author: bookAuthor,
            payed: false
        }

        this.books.push(book);
        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    };

    payBook(bookName) {
        let currentBook = this.books.find(b => b.name == bookName);

        if(currentBook == undefined){
            throw new Error(`${bookName} is not in the collection.`);
        }

        if (currentBook.payed == true){
            throw new Error(`${bookName} has already been paid.`);
        }

        currentBook.payed = true;
        return `${bookName} has been successfully paid.`;
    };

    removeBook(bookName){
        let currentBook = this.books.find(b => b.name == bookName);
        if(currentBook == undefined){
            throw new Error("The book, you're looking for, is not found.");
        }
        if(currentBook.payed == false){
            throw new Error(`${bookName} need to be paid before removing from the collection.`)
        }

        let index = this.books.indexOf(currentBook);
        this.books.splice(index, 1);
        return `${bookName} remove from the collection.`;
    };

    getStatistics(bookAuthor){
        let result = [];
        if(bookAuthor == undefined){
            result.push(`The book collection has ${this.capacity - this.addBook.length - 1} empty spots left.`);
            let sorted = this.books.sort((a,b) => a.name.localeCompare(b.name));

            for (const book of sorted) {
                result.push(`${book.name} == ${book.author} - ${book.payed == true ? 'Has Paid.': 'Not Paid.'}`);
            }
        } else {
            let book = this.books.find(b => b.author == bookAuthor);
            if (book == undefined){
                throw new Error(`${bookAuthor} is not in the collection.`)
            }

            result.push(`${book.name} == ${book.author} - ${book.payed == true ? 'Has Paid.': 'Not Paid.'}`)
        }
        
        return result.join('\n');
    };
};
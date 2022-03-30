import { getMyBooks } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0 ? books.map(myBookTemplate) : html`<p class="no-books">No books in database!</p>`}
</section>`

const myBookTemplate = (book) => html`
<ul class="my-books-list">
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>
</ul>
`
export async function myBooksView(ctx){
    const user = await getUserData();
    const books = await getMyBooks(user.id);
    ctx.render(myBooksTemplate(books));

}
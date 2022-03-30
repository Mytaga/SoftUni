import { addLike, deleteBookById, getAllLikes, getBookById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, isOwnwer, user, onDelete, onLike, totalLikes) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwnwer ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>` : null}
            <!-- Bonus -->
            ${user && !isOwnwer ? html`<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>` : null}
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`

export async function detailsView(ctx){
    const id = ctx.params.id;
    const book = await getBookById(id);
    const user = await getUserData();
    const isOwnwer = user && user.id == book._ownerId;
    const totalLikes = await getAllLikes(id);
    ctx.render(detailsTemplate(book, isOwnwer, user, onDelete, onLike, totalLikes))

    async function onDelete(e){
        e.preventDefault();
        const conf = confirm('Are you sure you want to delete this event ?');

        if (conf){
            await deleteBookById(id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike(e){
        e.preventDefault();
        await addLike(book._id);
        updateLikesSpan();
        e.target.style.display = 'none';
    }

    async function updateLikesSpan() {
        const newLikes = await getAllLikes(book._id);
        document.querySelector('#total-likes').textContent = `Likes: ${newLikes}`;
    }
}
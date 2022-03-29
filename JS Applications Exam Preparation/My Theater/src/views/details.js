import { addLike, deleteEventById, getAllLikes, getEventById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (event, isOwnwer, user, onDelete, onLike, totalLikes) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${event.title}</h1>
            <div>
                <img src=${event.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${event.description}</p>
            <h4>Date: ${event.date}</h4>
            <h4>Author: ${event.author}</h4>
            ${isOwnwer ? html`  <div class="buttons">
                <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${event._id}">Edit</a>
            </div>` : null}
            ${(!isOwnwer && user != null) ? html`<a class="btn-like" @click=${onLike} href="javascript:void(0)">Like</a>` : null}
            
            <p class="likes">Likes: ${totalLikes}</p>
        </div>
    </div>
</section>`

export async function detailsView(ctx){
    const id = ctx.params.id;
    const event = await getEventById(id);
    const user = await getUserData();
    const isOwnwer = user && user.id == event._ownerId;
    const totalLikes = await getAllLikes(id);
    ctx.render(detailsTemplate(event, isOwnwer, user, onDelete, onLike, totalLikes))

    async function onDelete(e){
        e.preventDefault();
        const conf = confirm('Are you sure you want to delete this event ?');

        if (conf){
            await deleteEventById(id);
            ctx.page.redirect('/myProfile');
        }
    }

    async function onLike(){
        
        await addLike(id)
    }
}
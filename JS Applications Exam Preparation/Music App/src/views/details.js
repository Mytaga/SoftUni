import { deleteAlbum, getAlbumById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, isCreator, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $ ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>
    
            ${isCreator ? html`<div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>` : null}
        </div>
    </div>
    </section>`

export async function detailsView(ctx){
    const album = await getAlbumById(ctx.params.id);
    const user = await getUserData();
    const isCreator = user && user.id == album._ownerId;

    ctx.render(detailsTemplate(album, isCreator, onDelete));

    async function onDelete(event){
        event.preventDefault();
        const confirmAnswer = confirm('Are you sure you want to delete this album?');

        if(confirmAnswer){
            await deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}
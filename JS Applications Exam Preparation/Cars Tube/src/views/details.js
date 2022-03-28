import { deleteCarById, getCarById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        ${isOwner ? html`<div class="listings-buttons"></div>
        <a href="/edit/${car._id}" class="button-list">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`: null}
        
    
</div>
</section>`

export async function detailsView(ctx){
    const user = await getUserData();
    const car = await getCarById(ctx.params.id);
    const isOwner = user && user.id == car._ownerId;
    ctx.render(detailsTemplate(car, isOwner, onDelete));

    async function onDelete(event){
        event.preventDefault();
        const confirmation = confirm('Are you sure you want to delete this car ?');
        if (confirmation){
            await deleteCarById(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
};

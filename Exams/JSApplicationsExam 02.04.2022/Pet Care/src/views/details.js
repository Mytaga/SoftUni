import { addDonation, deletePetById, getDonation, getPetById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, isOwner, user, onDelete, onDonate, donations) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age} years</h4>
                <h4>Weight: ${pet.weight}kg</h4>
                <h4 class="donation">Donation: ${donations * 100}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->

            ${isOwner? html`<div class="actionBtn">
                <a href="/edit/${pet._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
            </div>` : null}
            ${!isOwner && user != null ? html`<div class="actionBtn">
                <a href="javascript:void(0)" @click=${onDonate} class="donate">Donate</a>
            </div>` : null}

        </div>
    </div>
</section>`

export async function detailsView(ctx){
    const id = ctx.params.id;
    const pet = await getPetById(id)
    const user = await getUserData();
    const isOwner = user && user.id == pet._ownerId;
    const donations = await getDonation(pet._id);
    ctx.render(detailsTemplate(pet, isOwner, user, onDelete, onDonate, donations))

    async function onDelete(e){
        e.preventDefault();
        const conf = confirm('Are you sure you want to delete this pet ?');

        if (conf){
            await deletePetById(id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate(e){
        e.preventDefault();
        await addDonation(pet._id);
        updateDonation();
        e.target.style.display = 'none';

    }

    async function updateDonation() {
        const newDonations = await getDonation(pet._id);
        document.querySelector('.donation').textContent = `Donation: ${newDonations * 100}$`;
    }
    
}
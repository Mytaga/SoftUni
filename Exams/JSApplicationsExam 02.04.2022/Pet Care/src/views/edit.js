import { editPet, getPetById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (pet, onSubmit) => html`
<section id="editPage">
    <form class="editForm" @submit=${onSubmit}>
        <img src=${pet.image}>
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value=${pet.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value=${pet.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value=${pet.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value=${pet.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value=${pet.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`

export async function editView(ctx) {
    const id = ctx.params.id;
    const pet = await getPetById(id);
    ctx.render(editTemplate(pet, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const breed = formData.get('breed');
        const age = formData.get('age');
        const weight = formData.get('weight');
        const image = formData.get('image');

        const data = {
            name,
            breed,
            age,
            weight,
            image
        }  

       
        if (name == '' || breed == ''|| age == '' || weight == '' || image == ''){
            return alert('Please fill all fields')
        }
        await editPet(id, data);
        ctx.page.redirect(`/details/${id}`);
    }
}
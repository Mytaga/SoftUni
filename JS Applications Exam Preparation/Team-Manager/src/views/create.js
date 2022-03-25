import { createTeam } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form id="create-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error">Error message.</div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`


export function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const imageUrl = formData.get('logoUrl');
        const description = formData.get('description');

        if (name == '' || imageUrl == '' || description == ''){
            document.querySelector('#create-form .error').style.display = 'block'; 
            document.querySelector('#create-form .error').textContent = 'Please fill all fields';
        };

        if (name.length < 4){
            document.querySelector('#create-form .error').style.display = 'block'; 
            document.querySelector('#create-form .error').textContent = 'Name must be at least 4 characters long';
        };

        if (description.length < 10){
            document.querySelector('#create-form .error').style.display = 'block'; 
            document.querySelector('#create-form .error').textContent = 'Description must be at least 10 characters long';
        };

        let data = {
            name,
            imageUrl,
            description
        };

        await createTeam(data);
        ctx.page.redirect('/details');
    };
};
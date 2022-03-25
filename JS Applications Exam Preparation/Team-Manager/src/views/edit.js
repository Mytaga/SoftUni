import { editTeam, getTeamById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (onSubmit, team) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form id="edit-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error">Error message.</div>
            <label>Team name: <input type="text" name="name" value=${team.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" value=${team.logoUrl}></label>
            <label>Description: <textarea name="description">${team.description}</textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>`

export async function editView(ctx) {
    const team = await getTeamById(ctx.params.id);

    ctx.render(editTemplate(onSubmit, team));
    
    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');

        if (name == '' || logoUrl == '' || description == ''){
            document.querySelector('#edit-form .error').style.display = 'block'; 
            document.querySelector('#edit-form .error').textContent = 'Please fill all fields';
        };

        let data = {
            name,
            logoUrl,
            description
        };

        await editTeam(team._id, data);
        page.redirect(`/details/${team._id}`);
    }
}
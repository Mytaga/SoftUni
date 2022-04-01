import { deleteIdea, getIdeaDetails } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (idea, user, onDelete) => html`
<div class="container home some">
    <img class="det-img" src=${idea.img} />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    ${user != null ? html` <div class="text-center">
        <a class="btn detb" href="javascript:void(0)" @click=${onDelete}>Delete</a>
    </div>` : null}
</div>`

export async function detailsView(ctx){
    const id = ctx.params.id;
    const user = await getUserData();
    const idea = await getIdeaDetails(id);
    
    ctx.render(detailsTemplate(idea, user, onDelete));

    async function onDelete(event){
        event.preventDefault();
        await deleteIdea(id);
        ctx.page.redirect('/dashboard')
    }
}

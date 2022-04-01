import { getAllIdeas } from "../api/data.js";
import { html } from "../lib.js";

const dashboardTemplate = (books) => html`
<div id="dashboard-holder">
    ${books.length > 0 ? books.map(ideaTemplate) : html`<h1>No ideas yet! Be the first one :)</h1>`}
</div>`

const ideaTemplate = (idea) => html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src=${idea.img}>
    <a class="btn" href="/details/${idea._id}">Details</a>
</div>`

export async function dashboardView(ctx) {
    const ideas = await getAllIdeas();
    ctx.render(dashboardTemplate(ideas));
}
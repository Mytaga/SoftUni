import { getMemebers, getTeamById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (team, user, onJoin, onLeave, onCancel) => html`
<section id="team-home">
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">3 Members</span>
            ${user ? html`<div>
                <a href="/edit/${team._id}" class="action">Edit team</a>
                <a href="javascript:void(0)" class="action" @click=${onJoin}>Join team</a>
                <a href="javascript:void(0)" class="action invert" @click=${onLeave}>Leave team</a>
                Membership pending. <a href="javascript:void(0)" @click=${onCancel}>Cancel request</a>
            </div>` : null}

        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                <li>My Username</li>
                <li>James ${user ? html `<a href="#" class="tm-control action">Remove from team</a>`: null}</li>
                <li>Meowth${user ? html `<a href="#" class="tm-control action">Remove from team</a>`: null}</li>
            </ul>
        </div>
        ${user ? html` <div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
                <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                        class="tm-control action">Decline</a></li>
                <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                        class="tm-control action">Decline</a></li>
            </ul>
        </div>` : null}

    </article>
</section>`


export async function detailsView(ctx) {
    const team = await getTeamById(ctx.params.id);
    const user = await getUserData();
    /*  const members = await getMemebers(); */
    ctx.render(detailsTemplate(team, user))
}
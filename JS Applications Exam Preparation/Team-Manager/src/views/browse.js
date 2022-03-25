import { getAllMembers, getAllTeams } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const browseTemplate = (teams, user) => html`
<section id="browse">
    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${user ? html` <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` : null}

    ${teams.map(teamTemplate)}
    `

const teamTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">5000 Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`

export async function browseView(ctx) {
    const user = await getUserData();
    const teams = await getAllTeams();
    /* const memberes = await getAllMembers(); */
    ctx.render(browseTemplate(teams, user));
}
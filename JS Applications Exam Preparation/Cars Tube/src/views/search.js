import { html } from "../lib.js";

const searchTemplate = (onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>
</section>`


export function searchView(ctx){
    ctx.render(searchTemplate(onSearch));

    async function onSearch(event){
        event.preventDefault();
        const year = Number(document.getElementById('search-input').value);
        if(isNaN(year) || year == 0) {
            return alert('Please enter a valid year');
        }

        ctx.page.redirect('/search/' + encodeURIComponent(year));
    }
}
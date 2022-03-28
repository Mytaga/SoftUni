import { searchCarByYear } from "../api/data.js";
import { html } from "../lib.js";

const searchResponseTemplate = (cars, onSubmit) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${onSubmit}>Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
        ${cars.length == 0 ? html`<p class="no-cars"> No results.</p>` : cars.map(searchCarCardTemplate)}
    </div>
</section>`

const searchCarCardTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`

export async function searchResponseView(ctx){
    const carResults = await searchCarByYear(ctx.params.year);

    ctx.render(searchResponseTemplate(carResults, onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const year = Number(document.getElementById('search-input').value);
        if(isNaN(year) || year == 0) {
            return alert('Please enter a valid year');
        }
        
        ctx.page.redirect('/search/'+ year);
    }
}
import { editEvent, getEventById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (event, onSubmit) => html`
<section id="editPage">
    <form class="theater-form" @submit=${onSubmit}>
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value=${event.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${event.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" value=${event.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
                placeholder="Description">${event.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                value=${event.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>`

export async function editView(ctx){
    const id = ctx.params.id;
    const event = await getEventById(id);
    ctx.render(editTemplate(event, onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const date = formData.get('date');
        const author = formData.get('author');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        const data = {
            title,
            date,
            author,
            imageUrl,
            description
        }

        if (title == '' || date == ''|| author == '' || description == '' || imageUrl == ''){
            return alert('Please fill all fields')
        }

        await editEvent(id, data);
        ctx.page.redirect(`/details/${id}`);
    }
}
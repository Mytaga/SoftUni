const section = document.querySelector('#edit-page');
const form = section.querySelector('form');
let ctx = null;
let saveBtn = section.querySelector('[type="submit"]')

export async function showEdit(context, id){
    ctx = context;
    context.showPage(section);
    const book = await getById(id);
    section.querySelector('[name="title"]').value = book.title;
    section.querySelector('[name="description"]').value = book.description;
    section.querySelector('[name="imageUrl"]').value = book.imageUrl;
    section.querySelector('[name="type"]').value = book.type;
    saveBtn.setAttribute('id', id);
    saveBtn.addEventListener('click', editBook);
};

async function getById(id) {
    const url = `http://localhost:3030/data/books/${id}`;
    const response = await fetch(url);
    return await response.json();
};

async function editBook(ev){
    ev.preventDefault();
    let formData = new FormData(form);
    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');
    let type = formData.get('type');

    const user = JSON.parse(localStorage.getItem('user'));

    try {

        if (title == '' || description == '' || description == '' || imageUrl == '' || type == ''){
            return alert('All fields are required!');
        }
        const editResponse = await fetch(`http://localhost:3030/data/books/${ev.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({ title, description, imageUrl, type })
        });

        if (!editResponse.ok || editResponse.status !== 200) {
            let data = await editResponse.json();
            throw new Error(data.message);
        };

    } catch (error) {
        alert(error.message);
    };

    ctx.goto('/details', ev.target.id);
}; 
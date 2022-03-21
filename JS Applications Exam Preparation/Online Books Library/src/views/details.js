const section = document.querySelector('#details-page');
section.addEventListener('click', onEdit);
section.addEventListener('click', onDelete);
section.addEventListener('click', likeBook);
let ctx = null;

export async function showDetails(context, id) {
    ctx = context;
  
    context.showPage(section);
    const user = JSON.parse(localStorage.getItem('user'));
    const [book, likes] = await Promise.all([
        getById(id),
        getLikes(id),
    ]);
    const isOwner = user && user._id == book._ownerId;
    section.innerHTML = createBookHTML(book, isOwner, likes);
};

async function getById(id) {
    const url = `http://localhost:3030/data/books/${id}`;
    const response = await fetch(url);
    return await response.json();
};

function createBookHTML(book, isOwner, likes) {
    let html = `
    <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <div class="actions">
                 
    `
    if (isOwner) {
        html += `
        <a class="button" data-id="${book._id}"href="/edit">Edit</a>
        <a class="button" data-id="${book._id}"href="#">Delete</a>
    `
    };

    if (!isOwner && user) {
        html +=`
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        <a class="button" data-id="${book._id}"href="#">Like</a>
        `
    }

    html += `
    <!-- ( for Guests and Users )  -->
    <div class="likes">
       <img class="hearts" src="/images/heart.png">
       <span id="total-likes">Likes: ${likes}</span>
   </div>
           <!-- Bonus -->
       </div>
   </div>
   <div class="book-description">
       <h3>Description:</h3>
       <p>${book.description}</p>
   </div>
    `

    return html;
};

function onEdit(event){
    if (event.target.tagName == 'A' && event.target.textContent == 'Edit'){
        event.preventDefault();
        const id = event.target.dataset.id;
        if (id) {
            ctx.goto('/edit', id);
        }
    }
};

async function onDelete(event) {
    try {
        if (event.target.tagName == 'A' && event.target.textContent == 'Delete') {
            event.preventDefault();
            const id = event.target.dataset.id;
            const user = JSON.parse(localStorage.getItem('user'));
            const url = `http://localhost:3030/data/books/${id}`
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': user.accessToken
                }
            });

            if (response.ok != true) {
                const error = response.json();
                throw new Error(error.message)
            }
            ctx.goto('/');
        }
    } catch (error) {
        alert(error.message)
        ctx.goto('/');
    }
};

async function likeBook(event) {
    if (event.target.tagName == 'A' && event.target.textContent == 'Like') {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const id = event.target.dataset.id;
        await fetch('http://localhost:3030/data/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({
                id
            })
        });
        event.target.style.display = 'none';
        ctx.goto('/details', id);   
    }
};

async function getLikes(id) {

    const res = await fetch(`http://localhost:3030/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}
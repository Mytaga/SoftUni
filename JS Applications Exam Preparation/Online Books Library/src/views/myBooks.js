const section = document.querySelector('#my-books-page');
const catalog = section.querySelector('.my-books-list');
const noBooks = section.querySelector('.no-books');    
let ctx = null;
section.addEventListener('click', onDetailsSelect);

export function showMyBooks(context) {
    ctx = context;
    context.showPage(section);
    showBooks();
};

async function showBooks(){
    const books = await getBooks();
    if (Array.from(books).length > 0){
        catalog.replaceChildren(...books.map(renderBooks))
    }
    else {
        noBooks.style.display = 'block';
    }
};

function renderBooks(book){
    const listElement = document.createElement('li')
    listElement.className = 'otherBooks';
    listElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <a class="button" data-id="${book._id}" href="/details">Details</a>
            `
    return listElement;
};

function onDetailsSelect(event){
    if (event.target.tagName == 'A'){
        event.preventDefault();
        const id = event.target.dataset.id; 
        if (id){
            ctx.goto('/details', id);   
        }
    };
};

async function getBooks(){
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`http://localhost:3030/data/books?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`);
        const books = await response.json();
        return books;
    } catch (error){
        alert(error.message);
    }
};
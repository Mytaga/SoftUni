import { showPage } from '../app.js'

const section = document.querySelector('#create-page');
const form = section.querySelector('form');
form.addEventListener('submit', onsubmit);
let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showPage(section)
};

async function onsubmit(event){
    event.preventDefault();
    try {
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const type = formData.get('type');
    
        if(title == '' || description == '', imageUrl == ''){
            throw new Error('Please fill all fields');
        };
    
        addBook(title, description, imageUrl, type);
        form.reset();
        ctx.goto('/');
    } catch (error){
        alert(error.message);
    }
    
};

async function addBook(title, description, imageUrl, type){
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch('http://localhost:3030/data/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({ title, description, imageUrl, type })
        });

        if (response.ok != true){
            const error = await res.json();
            throw new Error(error.message);
        }

    } catch (err){
        alert(err.message);
    }
};
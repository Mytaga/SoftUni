import { showDashboard } from '../src/views/dashboard.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCreate } from './views/create.js';
import { showMyBooks } from './views/myBooks.js';
import { showDetails} from './views/details.js';
import { showEdit} from './views/edit.js';

const views = document.querySelector('#views');
const main = document.querySelector('main');
const nav = document.querySelector('.navbar');

views.remove();
nav.addEventListener('click', onNavigate)

const links = {
    '/': showDashboard,
    '/login': showLogin,
    '/register': showRegister,
    '/create': showCreate,
    '/myBooks': showMyBooks,
    '/logout': logout,
    '/details': showDetails,
    '/edit': showEdit
};

const context = {
    showPage,
    goto,
    updateNav
};

context.goto('/');
updateNav();

export function showPage(section) {
    main.replaceChildren(section)
};

function onNavigate(event){
    if (event.target.tagName == 'A'){
        event.preventDefault();
        const url = new URL(event.target.href);
        goto(url.pathname);
    }
};

function goto(name, ...params){
    const handler = links[name];
    if (typeof handler == 'function'){
        handler(context, ...params);
    };
};

function updateNav(){
    const user = JSON.parse(localStorage.getItem('user'));

    if (user){
        nav.querySelector('#user').style.display = 'block'; 
        nav.querySelector('#guest').style.display = 'none';
        nav.querySelector('#user').querySelector('span').textContent = `Welcome, ${user.email}`;
    }

    else {
        nav.querySelector('#user').style.display = 'none'; 
        nav.querySelector('#guest').style.display = 'block'; 
    }
};

async function logout(){
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': user.accessToken
        }
    });
    localStorage.removeItem('user');
    updateNav();
    context.goto('/');
};

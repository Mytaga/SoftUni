import { logout } from './api/api.js'
import { page, render} from './lib.js';
import { getUserData } from './util.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { dashboardView } from './views/dashboard.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { createView } from './views/create.js';
import { myBooksView } from './views/myBooks.js';

const root = document.querySelector('#site-content');

updateNav();
page.redirect('/dashboard');

page(decorateCtx);
page('/logout', onLogout);
page('/dashboard',dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/addBook', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/myBooks', myBooksView);

page.start();

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
};

function updateNav(){

    const userData = getUserData();
    if(userData){
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user').style.display = 'block';
        document.querySelector('span').textContent = `Welcome, ${userData.email}`
    } else {
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#user').style.display = 'none';
    }  
};

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}
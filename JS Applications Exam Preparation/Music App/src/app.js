import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';

const root = document.querySelector('#main-content');
updateNav();

page.redirect('/');
page(decorateContext)
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/search', searchView);
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
};

function updateNav() {
    const userData = getUserData();

    if(userData != null) {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'inline');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display ='none');
    } else {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'inline');
    }
};

async function onLogout(){
    await logout();
    updateNav();
    page.redirect('/');
}
import { logout } from './api/api.js';
import { page, render } from './lib.js'
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

const root = document.getElementById('main-content');
updateNav();
page.redirect('/');

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/logout', logoutUser);
page('/register', registerView);
page('/create', createView);
page('/catalog', catalogView);
page('/details/:id', detailsView); 
page('/edit/:id', editView);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
};

async function updateNav() {
    const userData = await getUserData();

    if(userData != null) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function logoutUser(){
    await logout();
    updateNav();
    page.redirect('/'); 
};
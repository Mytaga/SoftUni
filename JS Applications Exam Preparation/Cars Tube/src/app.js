import { logout } from './api/data.js';
import { page, render} from './lib.js'
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { myCarsView } from './views/myCars.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';
import { searchResponseView } from './views/searchResponse.js';

const root = document.querySelector('#site-content'); 

updateNav();
page.redirect('/');

page(decorateCtx);
page('/', homeView);
page('/login', loginView);
page('/logout', onLogout);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/myCars', myCarsView);
page('/search', searchView);
page('/search/:year', searchResponseView);

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
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#profile').children[0].textContent = `Welcome, ${userData.username}`;
    } else {
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#profile').style.display = 'none';
    }  
};


async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}
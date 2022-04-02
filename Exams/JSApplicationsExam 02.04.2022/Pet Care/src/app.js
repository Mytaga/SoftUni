import { logout } from './api/api.js'
import { page, render} from './lib.js';
import { getUserData } from './util.js';
import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

const root = document.querySelector('#content');

updateNav();
page.redirect('/');

page(decorateCtx);
page('/logout', onLogout);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView)
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView); 

page.start();

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
};

function updateNav(){

    const userData = getUserData();
    if(userData){
        document.querySelector('#guest1').style.display = 'none';
        document.querySelector('#guest2').style.display = 'none';
        document.querySelector('#user1').style.display = 'block';
        document.querySelector('#user2').style.display = 'block';
    } else {
        document.querySelector('#guest1').style.display = 'block';
        document.querySelector('#guest2').style.display = 'block';
        document.querySelector('#user1').style.display = 'none';
        document.querySelector('#user2').style.display = 'none';
    }  
};

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}
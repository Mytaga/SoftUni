import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { browseView } from "./views/browse.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { myTeamsView } from "./views/myTeams.js";
import { registerView } from "./views/register.js";

const root = document.querySelector('main'); 
updateNav();
page.redirect('/');

page(decorateCtx);
page('/', homeView);
page('/login', loginView);
page('/myTeams', myTeamsView);
page('/register', registerView);
page('/create', createView);
page('/browse', browseView);
page('/logout', onLogout);
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
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user').style.display = 'block';
    } else {
        document.querySelector('.guest').style.display = 'block';
        document.querySelector('.user').style.display = 'none';
    }
    
};


async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}
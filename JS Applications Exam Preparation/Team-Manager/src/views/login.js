import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error">Error message.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`


export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email == '' || password == ''){
            document.querySelector('#login-form .error').style.display = 'block'; 
            document.querySelector('#login-form .error').textContent = 'Please fill all fields'
        };
        
        await login(password, email);
        ctx.updateNav();
        ctx.page.redirect('/myTeams');
    }
}
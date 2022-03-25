import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form id="register-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error">Error message.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`

export function registerView(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const rePass = formData.get('repass');

        if (email == '' || password == '' || username == ''){
            document.querySelector('#register-form .error').style.display = 'block'; 
            document.querySelector('#register-form .error').textContent = 'Please fill all fields';
        };

        if (password.length < 3 || username.length < 3 ){
            document.querySelector('#register-form .error').style.display = 'block'; 
            document.querySelector('#register-form .error').textContent = 'Input must be at least 3 characters long';
        }

        if (password != rePass){
            document.querySelector('#register-form .error').style.display = 'block'; 
            document.querySelector('#register-form .error').textContent = 'Passwords must match';
        }
        await register(username, password, email);
        ctx.updateNav();
        ctx.page.redirect('/myTeams');
    }
}
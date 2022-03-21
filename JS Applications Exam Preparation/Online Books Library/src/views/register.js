const section = document.querySelector('#register-page');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export function showRegister(context) {
    ctx = context;
    context.showPage(section)
};

async function onSubmit(event) {
    event.preventDefault();
    try {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('confirm-pass');

        if (email == '' || password == '' || rePass == '') {
            throw new Error('Please fill all fields')
        };

        if (password !== rePass) {
            throw new Error('Passwords must match')
        };

        await register(email, password);
        form.reset();
        ctx.updateNav();
        ctx.goto('/');

    } catch (err) {
        alert(err.message);
    }

};

async function register(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));

    } catch (err) {
        alert(err.message);
        throw err;
    }
};
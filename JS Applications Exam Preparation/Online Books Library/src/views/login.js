const section = document.querySelector('#login-page');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showPage(section)
};

async function onSubmit(event){
    event.preventDefault();
    try{
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
    
        if(email == '' || password == ''){
            throw new Error('Please fill all fields')
        };
    
        await login(email, password);
        form.reset();
        ctx.updateNav();
        ctx.goto('/');

    } catch (err){
        alert(err.message);
    }
  
};

async function login(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
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
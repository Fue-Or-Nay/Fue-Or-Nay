const login = async (event) => {
    event.preventDefault();

    const username = document.getElementById('usernameLogin').value.trim();
    const password = document.getElementById('passwordLogin').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            console.log(response);
        }
        else {
            alert('Login Failed!')
        }
    }
};

document.getElementById('login').addEventListener('submit', login);
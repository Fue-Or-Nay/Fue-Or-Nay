const login = async (event) => {
    event.preventDefault();


    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    console.log(username, password)

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        console.log(response)

        if (response.ok) {
            document.location.replace('/')
        }
        else {
            alert('Login Failed!')
        }
    }
};



document.querySelector('#login').addEventListener('click', login);
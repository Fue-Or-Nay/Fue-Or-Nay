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

const createAccount = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#usernameCreate').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#passwordCreate').value.trim();
    const firstname = document.querySelector('#first_name').value.trim();
    const lastname = document.querySelector('#last_name').value.trim();

    console.log(username, email, password, firstname, lastname)
  
    if (username && email && password && firstname && lastname) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, firstname, lastname }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
        console.log(response)
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  



document.querySelector('#login').addEventListener('click', login);
document.querySelector('#create').addEventListener('click', createAccount);
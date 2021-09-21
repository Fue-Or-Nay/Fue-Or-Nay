const addReview = async (event) => {
    event.preventDefault();


    const num_rating = document.querySelector('#usernameLogin').value.trim();
    const description = document.querySelector('#passwordLogin').value.trim();
    const game_id = document.querySelector('#usernameLogin').value.trim();

    if (num_rating && description && game_id && user_id) {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ num_rating, description, game_id }),
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



document.querySelector('#submitReview').addEventListener('click', addReview);
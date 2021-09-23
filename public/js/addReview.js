const addReview = async (event) => {
    event.preventDefault();


    const num_rating = '8.8';
    const description = document.querySelector('#textarea2').value.trim();
    const game_id_get = window.location.pathname.split('/');
    const game_id = parseInt(game_id_get[2]);
    // const console_id = document.querySelector('#consoleSelect').getAttribute('value');
    const review_title = document.querySelector('#textarea1').value.trim();

    console.log(num_rating, review_title, description, game_id)

    if (num_rating && description && game_id && review_title) {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ num_rating, description, game_id, review_title }),
            headers: { 'Content-Type': 'application/json'},
        });

        console.log(response)

        if (response.ok) {
            console.log("success")
        }
        else {
            alert('error')
        }
    }
};


document.querySelector('#submitReview').addEventListener('click', addReview);
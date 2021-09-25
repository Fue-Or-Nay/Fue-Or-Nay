// var helpfulButton = document.querySelectorAll('.helpful');


// const helpful = async (event) => {
//     event.preventDefault();


//     const game_id_get = window.location.pathname.split('/');
//     const game_id = parseInt(game_id_get[2]);

//     console.log(game_id_get, game_id)
//     console.log(event.target)

//     // if (num_rating && description && game_id && review_title) {
//     //     const response = await fetch('/api/reviews', {
//     //         method: 'POST',
//     //         body: JSON.stringify({ num_rating, description, game_id, review_title }),
//     //         headers: { 'Content-Type': 'application/json'},
//     //     });

//     //     console.log(response)

//     //     if (response.ok) {
//     //         console.log("success")
//     //     }
//     //     else {
//     //         alert('error')
//     //     }
//     // }
// };

// // const addReview = async (event) => {
// //     event.preventDefault();


// //     const num_rating = document.querySelector('#fuegoRating').value;
// //     const description = document.querySelector('#textarea2').value.trim();
// //     const game_id_get = window.location.pathname.split('/');
// //     const game_id = parseInt(game_id_get[2]);
// //     const review_title = document.querySelector('#textarea1').value.trim();

// //     console.log(num_rating, review_title, description, game_id)

// //     if (num_rating && description && game_id && review_title) {
// //         const response = await fetch('/api/reviews', {
// //             method: 'POST',
// //             body: JSON.stringify({ num_rating, description, game_id, review_title }),
// //             headers: { 'Content-Type': 'application/json'},
// //         });

// //         console.log(response)

// //         if (response.ok) {
// //             console.log("success")
// //         }
// //         else {
// //             alert('error')
// //         }
// //     }
// // };

// for (i of helpfulButton) {
//     (function (i) {
//     i.addEventListener('click', helpful);
// });
// }


// document.querySelector('.helpful').addEventListener('click', helpful);
// // document.querySelector('#submitReview').addEventListener('click', addReview);
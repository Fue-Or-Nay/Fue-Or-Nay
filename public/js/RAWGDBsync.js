
const apiKey = 'f4bf4a6db41c4fd79514ada3413c5e32';


function syncDbConsoles() {
    fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`)
        .then(response => response.json())
        .then(function (data) {
            data.results.forEach(platform => {
                let game_ids = [];
                platform.games.forEach(game => {
                    game_ids.push(game.id);
                })
                var consoleObj = 
                    {
                        id: platform.id,
                        name: platform.name,
                        thumbnail: platform.image_background,
                        gameIds: game_ids
                    };
                console.log(JSON.stringify(consoleObj))
                 fetch('/api/consoles', {
                    method: 'POST',
                    body: JSON.stringify(consoleObj),
                    headers: { 'Content-Type': 'application/json'},
                });
            });
        })
        .catch(function (error) {
            console.warn(error);
        });
};

function syncDbGames() {
    fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
        .then(response => response.json())
        .then(function (data) {
            data.results.forEach(game => {
                let console_ids = [];
                game.platforms.forEach(console => {
                    console_ids.push(console.platform.id);
                })
                var gameObj = 
                    {
                        id: game.id,
                        title: game.name,
                        release_date: game.released,
                        thumbnail: game.background_image,
                        esrb_rating: game.esrb_rating.name,
                        genre: game.genres[0].name,
                        description: 'hi',
                        consoleIds: console_ids
                    };
                console.log(JSON.stringify(gameObj))
                 fetch('/api/games', {
                    method: 'POST',
                    body: JSON.stringify(gameObj),
                    headers: { 'Content-Type': 'application/json'},
                });
            });
        })
        .catch(function (error) {
            console.warn(error);
        });
};

// syncDbConsoles();
// syncDbGames();

//Need to make it so that games and consoles can see each other on the through table. Could potentially flood the consoles and games without the consoleIds and gameIds, then run to fetches to update them with the IDS.

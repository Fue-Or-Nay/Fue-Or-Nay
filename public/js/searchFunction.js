const searchDb = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#homepageSearch').value.trim();

    if (title) {
        window.location.replace(`/search/${title}`);
    }  
};


document.querySelector('#mainSearch').addEventListener('click', searchDb);
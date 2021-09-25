

const searchDb = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#homepageSearch').value.trim();

    if (title) {
        window.location.replace(`/search/${title}`);
    }
};

const searchDbMobile = async (event) => {
    event.preventDefault();

    const titleMobile = document.querySelector('#responsiveSearch').value.trim();

    if (titleMobile) {
        window.location.replace(`/search/${titleMobile}`);
    }
};

document.querySelector('#mainSearch').addEventListener('click', searchDb);
document.querySelector('#responsiveSearchButton').addEventListener('click', searchDbMobile);
const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=401e5ec5b341181243700d1c503387c9&sort_by=popularity.desc&page=1';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=401e5ec5b341181243700d1c503387c9&query=${search_key}&page=1';
const img = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById('main');
const form = document.getElementById('form');
const searchData = document.getElementById('searchData');

getAllMovie(API_URL);

function getAllMovie(url) {
    fetch(url).then(result => result.json())
    .then(data => {
        console.log(data.results)
        showMovies(data.results)
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, release_date} = movie
        const detailMovie = document.createElement('div');
        detailMovie.classList.add('movie');
        detailMovie.innerHTML = `
            <img src="${img+poster_path}" alt="${title}">

            <div class="detail">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="date">${release_date}</div>

        `

        main.appendChild(detailMovie);
    })
}

function getColor(rate) {
    if(rate>= 8){
        return 'green'
    }else if(rate >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

function fetchAll() {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=401e5ec5b341181243700d1c503387c9")
    .then(result => result.json()
    ).then(data => {
        showMovies(data.results);
    })
}
fetchAll();

form.addEventListener('change', (event) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=401e5ec5b341181243700d1c503387c9&query=${event.target.value}&page=1`)
    .then(result => result.json()
    ).then(data => {
        console.log(data.results);
        showMovies(data.results)
    })
})
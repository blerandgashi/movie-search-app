let movieInputEl = document.querySelector("#search-input");
let movieContainer = document.querySelector("#movie-container")
const searchBtn = document.querySelector("#search-btn");
const apiKey = '4276726f8101e56146209a4c21fc8f9d';

let errorMessage = document.querySelector("#error");

async function getMovie() {
  movieContainer.innerHTML = "";

  const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieInputEl.value}`)
  const data = await response.json()

    console.log(data);
    data.results.forEach(index => {

      const posterUrl = `https://image.tmdb.org/t/p/w500${index.poster_path}}`;
      
      if (index.poster_path != null) {
        movieContainer.innerHTML += `
          <div class="movie-card">
            <div class="movie-card-container">
              <div class="movie-poster">
                <img src="${posterUrl}">
              </div>
              <div class="movie-details">
                <h2>${index.title}</h2>
                <div class="movie-info">
                  <span>${index.release_date}</span>
                  <span class="movie-rating">⭐ ${index.vote_average.toFixed(2)}</span>
                </div>
                <p class="movie-plot">
                  ${index.overview}
                </p>
                <div class="movie-meta">
                  <p><strong>Popularity:</strong> ${index.popularity}</p>
                  <p><strong>Original language:</strong> ${index.original_language}</p>
                  <p><strong>Vote count:</strong> ${index.vote_count}</p>
                </div>
              </div>
            </div>
            <div class="watchlist-btn">
              <button class="add-btn" 
                data-id="${index.id}"
                data-title="${index.title}"
                data-poster="${posterUrl}"
                data-year="${index.release_date}"
                data-rating="${index.vote_average.toFixed(2)}"
                data-overview="${index.overview}">
                +
              </button>
              <span>Watchlist</span>
            </div>
          </div>
        ` 
      }
    })
}

movieContainer.addEventListener("click", function(e){
  if (e.target.classList.contains("add-btn")) {
    const movieData = {
      id: e.target.dataset.id,
      title: e.target.dataset.title,
      poster: e.target.dataset.poster,
      year: e.target.dataset.year,
      rating: e.target.dataset.rating,
      overview: e.target.dataset.overview
    }

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.find(movie => movie.id === movieData.id);
    
    if (!exists) {
      watchlist.push(movieData);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert("Movie is added in watchlist!")
    }else{
      alert("The movie exists in watchlist!")
    }
  }
})

searchBtn.addEventListener("click", function(){
  if (movieInputEl.value != "") {
    getMovie();
    errorMessage.classList.remove("active");
    movieInputEl.value = "";
  }else{
    errorMessage.classList.add("active")
  }
})

movieInputEl.addEventListener("keypress", function(e){
  if (e.key === 'Enter') {
    getMovie();
  }
})

movieInputEl.addEventListener("input", getMovie)
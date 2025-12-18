let movieInputEl = document.querySelector("#search-input");
let movieContainer = document.querySelector("#movie-container")
const searchBtn = document.querySelector("#search-btn");
const apiKey = '4276726f8101e56146209a4c21fc8f9d';

searchBtn.addEventListener("click", function(){
  movieContainer.innerHTML = "";

  fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieInputEl.value}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.results.forEach(index => {
        const posterUrl = `https://image.tmdb.org/t/p/w500${index.poster_path}}`;

        if (index.poster_path != null) {
          movieContainer.innerHTML += `
            <div class="movie-card">
              <div class="movie-poster">
                <img src="${posterUrl}">
              </div>
              <div class="movie-details">
                <h2>${index.title}</h2>
                <div class="movie-info">
                  <span>${index.release_date}</span>
                  <span class="movie-rating">⭐ ${index.vote_average.toFixed(2)}</span>
                </div>
                <p class="movie-plot"></p>
                <div class="movie-meta">
                  <p><strong>Director:</strong> ${index.Director}</p>
                  <p><strong>Actors:</strong> ${index.Actors}</p>
                  <p><strong>Genre:</strong> ${index.Genre}</p>
                </div>
              </div>
            </div>
          ` 
        }
      })
    })
})
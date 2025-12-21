// localStorage
/* 
can save datas even after refreshing the page
stores string only
like:
key -> value
"theme" -> "dark"

IMPORTANT!!-Update localStorage (important concept)
You cannot edit directly in localStorage.

You must:
1.Get data
2.Modify it
3.Save it again
*/ 

const watchlistContainer = document.querySelector(".watchlist-container");
const emptyMessageError = document.querySelector("#empty-message")

let localStorageDatas = JSON.parse(localStorage.getItem("watchlist")) || [];
console.log(localStorageDatas);

if (localStorageDatas.length === 0) {
  emptyMessageError.classList.add("active")
}else{
  emptyMessageError.classList.remove("active");

  localStorageDatas.forEach(movie => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster}`

    watchlistContainer.innerHTML += `
      <div class="movie-card">
        <div class="movie-card-container">
          <div class="movie-poster">
            <img src="${posterUrl}">
          </div>
          <div class="movie-details">
            <h2>${movie.title}</h2>
            <div class="movie-info">
              <span>${movie.year}</span>
              <span class="movie-rating">⭐ ${movie.rating}</span>
            </div>
            <p class="movie-plot">
              ${movie.overview}
            </p>
            <div class="movie-meta">
              <p><strong>Popularity:</strong> ${movie.popularity}</p>
              <p><strong>Original language:</strong> ${movie.language}</p>
              <p><strong>Vote count:</strong> ${movie.voting}</p>
            </div>
          </div>
        </div>
        <div class="remove">
          <button class="remove-btn" data-id="${movie.id}">-</button>
          <span>Remove</span>
        </div>
      </div>
    `
  });
}
watchlistContainer.addEventListener("click", function(e){
  if (e.target.classList.contains("remove-btn")) {
    let movieID = e.target.dataset.id;

    localStorageDatas = localStorageDatas.filter(movie => movie.id !== movieID);

    localStorage.setItem("watchlist", JSON.stringify(localStorageDatas));

    location.reload()
  }
})
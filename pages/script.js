import Movie from "./Movie.js";

const apiUrl = "https://www.omdbapi.com/";
const apiKey = "e6ea3c05";


const fetchMovieData = async (title, year = "") => {
  
  const queryParams = new URLSearchParams({ apikey: apiKey, t: title });
  if (year) {
    queryParams.append("y", year); 
  }
    const url = `${apiUrl}?${queryParams.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Response === "True" 
        ? new Movie(
            data.Title,
            data.Year,
            data.Genre,
            data.Plot,
            data.Director,
            data.Actors,
            data.imdbRating,
            data.Poster
        ) 
        : null;
}

const displayMovieInfo = (movie) => {
    const movieInfo = document.getElementById("movieInfo");
  
    movieInfo.innerHTML = `
      <div class="grid grid-cols-3 gap-5 mt-5 items-stretch">
        <div class="poster">
          <img class="w-full h-full object-cover rounded-lg" src="${movie.poster}" alt="Poster for ${movie.title}" />
        </div>
        <div class="border-2 border-blue-200 rounded-lg p-4 bg-blue-100 flex flex-col justify-between">
          <h2 class="text-xl font-bold mb-2">${movie.title} (${movie.year})</h2>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Plot:</strong> ${movie.plot}</p>
          <p><strong>Director:</strong> ${movie.director}</p>
        </div>
        <div class="border-2 border-blue-200 rounded-lg p-4 bg-blue-100 flex flex-col justify-between">
          <p><strong>Actors:</strong> ${movie.actors}</p>
          <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        </div>
      </div>
    `;
  };
  

const form = document.getElementById("movieForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;

  const movie = await fetchMovieData(title, year);

  if (movie) {
    displayMovieInfo(movie);
  } else {
    const movieInfo = document.getElementById("movieInfo");
    movieInfo.innerHTML = <p>Movie not found!</p>;
  }
}); 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [signedInMessage, setSignedInMessage] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const signedIn = localStorage.getItem('signedIn');
    const userEmail = localStorage.getItem('userEmail');
    if (!signedIn) {
      router.push('/');
    } else {
      setSignedInMessage(`Signed in as ${userEmail}`);
    }
  }, []);

  const fetchMovieData = async () => {
    const apiKey = 'e6ea3c05';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}&y=${movieYear}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovie({
          title: data.Title,
          year: data.Year,
          genre: data.Genre,
          plot: data.Plot,
          director: data.Director,
          actors: data.Actors,
          imdbRating: data.imdbRating,
          poster: data.Poster,
        });
      } else {
        setMovie(null);
        alert('Movie not found!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🎬 Movie Search Dashboard</h1>

        {signedInMessage && (
          <p className="text-lg text-green-600 mb-4">{signedInMessage}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchMovieData();
          }}
          className="mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Movie Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={movieYear}
            onChange={(e) => setMovieYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Search Movie
          </button>
        </form>

        {movie && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div>
              <img src={movie.poster} alt={`Poster for ${movie.title}`} className="rounded" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <h2 className="text-xl font-bold">{movie.title} ({movie.year})</h2>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Plot:</strong> {movie.plot}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Actors:</strong> {movie.actors}</p>
              <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
            </div>
          </div>
        )}

        <button
          className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={() => {
            localStorage.removeItem('signedIn');
            localStorage.removeItem('userEmail');
            router.push('/');
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

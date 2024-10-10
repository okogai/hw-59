import React, { useState, useEffect, FormEvent } from "react";
import MovieItem from "../MovieItem/MovieItem";
import { Movie } from "../../types";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const storedMovies = localStorage.getItem("movies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  const [newMovieTitle, setNewMovieTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMovieTitle.trim() === "") return;

    const newMovie: Movie = { id: String(new Date()), title: newMovieTitle };
    setMovies((prevMovies) => [...prevMovies, newMovie]);
    setNewMovieTitle("");
  };

  const deleteMovie = (id: string) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const editMovie = (id: string, newTitle: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, title: newTitle } : movie,
      ),
    );
  };

  return (
    <div className="container mt-5 col-4">
      <h1 className="text-center">Movies list</h1>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new movie..."
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>

      <div>
        {movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onDelete={deleteMovie}
            onEdit={editMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

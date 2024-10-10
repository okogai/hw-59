import React from "react";
import { MovieProps } from "../../types";

const MovieItem: React.FC<MovieProps> = React.memo(
  ({ movie, onDelete, onEdit }) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const newTitle = e.target.value.trim();
      if (newTitle !== movie.title && newTitle !== "") {
        onEdit(movie.id, newTitle);
      }
    };

    return (
      <div className="input-group mb-3" key={movie.id}>
        <input
          type="text"
          className="form-control"
          defaultValue={movie.title}
          onBlur={handleBlur}
        />
        <div className="input-group-append">
          <button className="btn btn-danger" onClick={() => onDelete(movie.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  },
);

export default MovieItem;

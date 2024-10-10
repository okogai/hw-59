export interface Movie {
  id: string;
  title: string;
}

export interface MovieProps {
  movie: Movie;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

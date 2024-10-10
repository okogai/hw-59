import React, { useCallback, useEffect, useState } from "react";
import JokeButton from "../JokeButton/JokeButton.tsx";
import { Joke } from "../../types";
import JokeItem from "./JokeItem.tsx";

const API_URL = "https://api.chucknorris.io/jokes/random";

const fetchChuckNorrisJokes = async (count: number): Promise<Joke[]> => {
  const jokePromises: Promise<Joke>[] = [];

  for (let i = 0; i < count; i++) {
    jokePromises.push(
      (async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }
        return response.json();
      })(),
    );
  }

  return await Promise.all(jokePromises);
};

const JokeList: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadJokes = useCallback(async () => {
    setLoading(true);
    try {
      const newJokes = await fetchChuckNorrisJokes(5);
      setJokes(newJokes);
      setLoading(false);
    } catch (error) {
      console.error("Error loading jokes:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadJokes();
    })();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Chuck Norris Jokes</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="row justify-content-center gap-3">
          {jokes.map((joke) => (
            <JokeItem key={joke.id} id={joke.id} value={joke.value} />
          ))}
        </div>
      )}
      <JokeButton onClick={loadJokes} />
    </div>
  );
};

export default JokeList;

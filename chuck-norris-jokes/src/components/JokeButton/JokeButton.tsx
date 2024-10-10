import React from 'react';

interface Props {
  onClick: () => void;
}

const JokeButton: React.FC<Props> = React.memo(({ onClick }) => {
  console.log("render");

  return (
    <button className="btn btn-primary mt-3" onClick={onClick}>
      Get New Jokes
    </button>
  );
});

export default JokeButton;
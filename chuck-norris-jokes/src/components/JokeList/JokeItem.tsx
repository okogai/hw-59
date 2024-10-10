import React from "react";

interface Props {
  id: string;
  value: string;
}

const JokeItem: React.FC<Props> = ({ id, value }) => {
  return (
    <div className="col-md-3 mb-3 p-3 border rounded" key={id}>
      <p className="card-text">{value}</p>
    </div>
  );
};

export default JokeItem;

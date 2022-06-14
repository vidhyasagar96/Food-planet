import React from "react";
import "../components/Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="img-container">
        <img src={props.src} alt={props.alt} onClick={props.onClicking} />
      </div>
      <p className="card__title" onClick={props.onClicking}>
        {props.title}
      </p>
    </div>
  );
};

export default Card;

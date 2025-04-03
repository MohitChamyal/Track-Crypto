import React from 'react';
import { Link } from "react-router-dom";
import './CoinSummary.css';

const CoinSummary = (props) => {
  const changeStyle = {
    color: props.change < 0 ? 'red' : '#4caf50',
  };

  return (
    <Link to={`/${props.id}`}>
      <div className="container">
        <img src={props.image} alt={props.name} />
        <div className="name">
          {props.name}
        </div>
        <div className="price">
          {props.price}
        </div>
        <div className="change" style={changeStyle}>
          {props.change}%
        </div>
      </div>
    </Link>
  );
};

export default CoinSummary;

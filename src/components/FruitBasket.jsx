import React, { forwardRef } from 'react';
import './FruitBasket.css';

const FruitBasket = forwardRef(({ currentFruit }, ref) => {
  return (
    <div className="fruit-basket" ref={ref}>
      <h2>Drop the {currentFruit?.name} here!</h2>
      <div className="basket">
        <img src="/Assets/basket.png" alt="Fruit Basket" />
      </div>
    </div>
  );
});

export default FruitBasket;


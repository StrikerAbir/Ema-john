import React from 'react';
import './product.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = ({ handleAddToCart, product }) => {
  // const { handleAddToCart, product } = props; eta upore props er probortew use kora jai.
  const { img, name, price, seller, ratings } = product;

  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <p className="product-name">{name}</p>
        <p>Price: ${price}</p>
        <p>
          <small>Seller: {seller} stars</small>
        </p>
        <p>
          <small>Ratings: {ratings} stars</small>
        </p>
      </div>
      <button onClick={() => handleAddToCart(product)} className="btn-cart">
              <p>Add to Cart</p>
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Product;
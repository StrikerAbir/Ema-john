import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  // const [products, setProducts] = useState([])
  const products = useLoaderData();
  // console.log(products);
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //     console.log('before fetch');
  //     fetch('products.json')
  //         .then(res => res.json())
  //         .then(data => {
  //             setProducts(data);
  //             // console.log('fetch finished');
  //         });

  // }, [])

  useEffect(() => {
    // console.log('local storage');
    const storedCart = getStoredCart();
    // console.log(storedCart);
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      // console.log('storage finished');
      if (addedProduct) {
        // console.log(addedProduct);
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find((product) => product.id === selectedProduct.id);
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exist.quantity = exist.quantity + 1;
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to="/orders">
            <button>Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;

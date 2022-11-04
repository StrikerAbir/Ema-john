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

/*
  count,
  per page,
  pages : count /perpage
  current page
*/

const Shop = () => {
  // const [products, setProducts] = useState([])
  const { products, count } = useLoaderData();

  // console.log(products);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const pages = Math.ceil(count / perPage);

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
      const addedProduct = products.find((product) => product._id === id);
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
    const exist = cart.find((product) => product._id === selectedProduct._id);
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exist.quantity = exist.quantity + 1;
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
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
            key={product._id}
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
      <div className="pagination">
        <p>Currently selected page : {currentPage}</p>
        {[...Array(pages).keys()].map((number) => (
          <button onClick={() => setCurrentPage(number)} key={number} className={currentPage===number && 'selected'}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Shop;

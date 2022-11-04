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
  // const { products, count } = useLoaderData();

  // console.log(products);
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const pages = Math.ceil(count / perPage);

  useEffect(() => {
    const url = `http://localhost:1000/products?currentPage=${currentPage}&perPage=${perPage}`;
      fetch(url)
          .then(res => res.json())
          .then(data => {
              setProducts(data.products);
              setCount(data.count);
              // console.log('fetch finished');
          });

  }, [ perPage,currentPage])

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];

    const ids = Object.keys(storedCart);
    console.log(ids);
    fetch("http://localhost:1000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        for (const id in storedCart) {
          const addedProduct = data.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
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
        <p>Currently selected page : {currentPage} per page items : { perPage}</p>
        {[...Array(pages).keys()].map((number) => (
          <button onClick={() => setCurrentPage(number)} key={number} className={currentPage===number && 'selected'}>
            {number+1}
          </button>
        ))}
        <select onChange={event=>setPerPage(event.target.value)}>
          <option value='5'>5</option>
          <option value='10' selected>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;

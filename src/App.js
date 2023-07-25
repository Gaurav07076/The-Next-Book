import React, { useState, useEffect } from "react";
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar"

import { Products, Navbar, Cart, Checkout } from './components';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage,setErrorMessage] = useState(''); 

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());

  }

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }));

  }

  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));

  }

  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());

  }

  const refershCart = async()=>{
    const newCart = await commerce.cart.refersh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refershCart();
    } catch(error){
        setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
          {/* {onAddToCart={handleAddToCart} */}
          <Route path="/cart" element={<Cart cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />} />
          <Route path ="/checkout" element={<Checkout cart = {cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>} />
        </Routes>


      </div>

    </Router>

  )
}

export default App;

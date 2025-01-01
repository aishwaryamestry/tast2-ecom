import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ProductCard from "../Product/ProductCard";
import { ToastContainer } from "react-toastify";
import { FaShoppingCart, FaTrash } from "react-icons/fa"; // Import trash icon

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Initialize navigation

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (product) => {
    // Remove product from localStorage cart
    const updatedCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleProceedToCheckout = () => {
    // Save cart to localStorage and navigate to checkout page
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Cart</h3>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* Proceed to Checkout Button */}
          <div className="mt-4 flex justify-start">
            <button
              onClick={handleProceedToCheckout}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {cart.map((item) => (
              <div key={item.id} className="relative">
                <ProductCard
                  product={item}
                  isInWishlist={false}
                  onAddToCart={() => {}}
                  onToggleWishlist={() => {}}
                />
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default ShoppingCart;

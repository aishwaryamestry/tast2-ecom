import React, { useState, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { ToastContainer } from "react-toastify";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (product) => {
    // Remove product from localStorage wishlist
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Wishlist</h3>
      {wishlist.length === 0 ? (
        <p className="mt-4 text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {wishlist.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInWishlist={true}
              onAddToCart={() => {}}
              onToggleWishlist={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WishlistPage;

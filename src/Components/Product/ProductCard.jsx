import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const handleWishlistToggle = () => {
    // Toggle the wishlist item in localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== product.id) // Remove if already in wishlist
      : [...wishlist, product]; // Add to wishlist if not already

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Show toast message
    onToggleWishlist(product);
    toast.success(
      isInWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  const handleAddToCart = () => {
    // Add product to localStorage cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Show toast message
    onAddToCart(product);
    toast.success("Added to Cart", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl hover:bg-gray-100 transition-all duration-300">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={handleWishlistToggle}
          className="p-2 bg-white rounded-full shadow hover:bg-red-500 hover:text-white"
        >
          <FaHeart
            className={isInWishlist ? "text-red-500" : "text-gray-400"}
          />
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="p-2 bg-white rounded-full shadow hover:bg-green-500 hover:text-white"
        >
          <FaShoppingCart />
        </button>
      </div>
      <img
        src={product.image_link}
        alt={product.product_name}
        className="w-full h-40 object-contain rounded-lg"
      />
      <div className="mt-4">
        <h3 className="font-bold">{product.product_name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p>
          Price: ${product.price} - ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

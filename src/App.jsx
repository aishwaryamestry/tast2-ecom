import { Route, Routes, useNavigate } from "react-router-dom";
import Banner from "./Components/Banner/Banner";
import OrderConfirmationModal from "./Components/CheckoutForm/OrderConfirmationModal";
import OrderPage from "./Components/Order/OrderPage";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import ProductsPage from "./Components/Product/ProductPage";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import { productsData } from "../ProductsData";
import { useState, useEffect } from "react";
import WishlistPage from "./Components/WishlistPage/WishlistPage";
import { flattenProducts } from "./utils/Productutils";
// // Flatten products from nested categories
// const flattenProducts = (data) => {
//   let products = [];
//   data.forEach((categoryData) => {
//     categoryData.kids_wear.categories.forEach((category) => {
//       category.sub_categories.forEach((subCategory) => {
//         subCategory.products.forEach((product) => {
//           products.push({
//             ...product,
//             category: category.category_name,
//             subCategory: subCategory.sub_category_name,
//             price_range: parsePriceRange(product.price),
//             aosDelay: "0", // Customize delay as needed for animations
//           });
//         });
//       });
//     });
//   });

//   return products;
// };

const App = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(
    flattenProducts(productsData)
  );

  // Apply selected filters to the products
  const applyFilters = (selectedFilters) => {
    let filtered = flattenProducts(productsData);

    // Apply category filter
    if (selectedFilters.category?.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.category.includes(p.category)
      );
    }

    // Apply price filter
    if (selectedFilters.priceRange) {
      filtered = filtered.filter(
        (p) =>
          p.price >= selectedFilters.priceRange.min &&
          p.price <= selectedFilters.priceRange.max
      );
    }

    // Apply brand filter (if applicable)
    if (selectedFilters.brands?.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.brands.includes(p.brand)
      );
    }

    // Apply ratings filter (if applicable)
    if (selectedFilters.ratings) {
      filtered = filtered.filter((p) => p.rating >= selectedFilters.ratings);
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => setFilteredProducts(flattenProducts(productsData));

  const handleCloseModal = () => setOrderData(null);

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // Handle checkout logic
    console.log("Proceeding to checkout");
  };

  const handleMoveToCart = (item) => {
    // Add item to the cart
    setCartItems((prev) => [...prev, item]);
    // Remove from wishlist
    setWishlistItems((prev) =>
      prev.filter((i) => i.product_id !== item.product_id)
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar />
      <div className="flex">
        {/* Sidebar for Filters */}
        {/* You can uncomment this section if you want a filter sidebar */}
        {/* <div className="w-1/4">
          <FilterSidebar
            categories={productsData[0].kids_wear.categories} // Assuming this structure is correct
            filters={{}} // Filters can be initialized here if needed
            setFilters={applyFilters}
            onClearFilters={clearFilters}
          />
        </div> */}

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route
              path="/products"
              element={
                <ProductsPage
                  handleAddToCart={(product) => {
                    setCartItems((prev) => [...prev, product]);
                  }}
                  handleToggleWishlist={(product) => {
                    setWishlistItems((prev) =>
                      prev.includes(product)
                        ? prev.filter((item) => item.id !== product.id)
                        : [...prev, product]
                    );
                  }}
                  wishlistItems={wishlistItems}
                  filteredProducts={filteredProducts}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <ShoppingCart
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity} // Ensure this is defined
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutForm
                  cartItems={cartItems}
                  onPlaceOrder={(data) => {
                    setOrderData(data);
                    navigate("/order");
                  }}
                />
              }
            />
            <Route
              path="/order"
              element={<OrderPage orderItems={cartItems} />}
            />

            <Route
              path="/wishlist"
              element={<WishlistPage onMoveToCart={handleMoveToCart} />}
            />
          </Routes>
        </div>
      </div>
      {orderData && (
        <OrderConfirmationModal
          orderData={orderData}
          onClose={handleCloseModal}
        />
      )}
      <Banner />
    </div>
  );
};

export default App;

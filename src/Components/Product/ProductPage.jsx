import { flattenProducts } from "../../utils/Productutils";
import { productsData } from "../../../ProductsData";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    categories: [],
    price: { min: 0, max: 100 },
    brands: [],
    ratings: 0,
  });

  const [filteredProducts, setFilteredProducts] = useState(
    flattenProducts(productsData)
  );
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = flattenProducts(productsData);

    if (filters.categories.length) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    const { min, max } = filters.price;
    if (min !== undefined && max !== undefined) {
      filtered = filtered.filter(
        (product) =>
          product.price_range.min >= min && product.price_range.max <= max
      );
    }

    if (filters.brands.length) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    if (filters.ratings) {
      filtered = filtered.filter(
        (product) => product.ratings >= filters.ratings
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <FilterSidebar
          categories={[
            ...new Set(flattenProducts(productsData).map((p) => p.category)),
          ]}
          filters={filters}
          setFilters={setFilters}
          onClearFilters={() =>
            setFilters({
              categories: [],
              price: { min: 0, max: 100 },
              brands: [],
              ratings: 0,
            })
          }
        />
      </div>
      <div className="w-3/4 p-4">
        <ToastContainer />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-aos="zoom-in"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={wishlist.some((item) => item.id === product.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

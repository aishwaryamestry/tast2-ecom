// src/utils/productUtils.js

// Flatten the products data structure for easier access
export const flattenProducts = (data) => {
  const products = [];
  data.forEach((section) => {
    Object.values(section).forEach((categoryGroup) => {
      categoryGroup.categories.forEach((category) => {
        category.sub_categories.forEach((subCategory) => {
          subCategory.products.forEach((product) => {
            products.push({
              ...product,
              category: category.category_name,
              subCategory: subCategory.sub_category_name,
              price_range: parsePriceRange(product.price),
            });
          });
        });
      });
    });
  });
  return products;
};

// Parse a price range string into an object with min and max values
const parsePriceRange = (priceRangeStr) => {
  // Return a default value if the price range is not a valid string
  if (!priceRangeStr || !priceRangeStr.includes("-")) {
    return { min: 0, max: 1000 }; // Default range
  }

  const [min, max] = priceRangeStr.split("-").map(Number);

  // Return a default range if the parsing fails
  if (isNaN(min) || isNaN(max)) {
    return { min: 0, max: 1000 };
  }

  return { min, max };
};

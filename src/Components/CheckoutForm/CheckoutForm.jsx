import { useState, useEffect } from "react";
import OrderPage from "../Order/OrderPage";
import OrderConfirmationModal from "./OrderConfirmationModal";

const CheckoutForm = ({ onPlaceOrder }) => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    creditCardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.address) formErrors.address = "Address is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Valid email is required.";
    if (!formData.creditCardNumber || formData.creditCardNumber.length !== 16)
      formErrors.creditCardNumber = "Credit Card number must be 16 digits.";
    if (!formData.expiryDate)
      formErrors.expiryDate = "Expiry date is required.";
    if (!formData.cvv || formData.cvv.length !== 3)
      formErrors.cvv = "CVV must be 3 digits.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart); // Update cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate a delay to process the order
      setTimeout(() => {
        const mockOrderData = {
          customer: formData.name,
          address: formData.address,
          email: formData.email,
          items: cartItems,
          deliveryDate: new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
        setOrderData(mockOrderData); // Prepare the order details
        setShowConfirmationModal(true); // Show the confirmation modal
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handlePlaceOrder(e); // Call handlePlaceOrder when form is valid
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-2">
        <div className=" my-20">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <div>
              <label className="block text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200
      invalid:border-rose-400  invalid:text-rose-400
      focus:invalid:border-rose-400 focus:invalid:ring-rose-400
      ${
        errors.name
          ? "border-rose-400 text-rose-400 focus:border-rose-400 focus:ring-rose-400"
          : "border-slate-300 focus:border-sky-200 focus:ring-sky-200"
      }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200
      invalid:border-rose-400  invalid:text-rose-400
      focus:invalid:border-rose-400 focus:invalid:ring-rose-400"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200
      invalid:border-rose-400  invalid:text-rose-400
      focus:invalid:border-rose-400 focus:invalid:ring-rose-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm">Credit Card Number</label>
              <input
                type="text"
                name="creditCardNumber"
                value={formData.creditCardNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200
      invalid:border-rose-400  invalid:text-rose-400
      focus:invalid:border-rose-400 focus:invalid:ring-rose-400"
              />
              {errors.creditCardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.creditCardNumber}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200
      invalid:border-rose-400  invalid:text-rose-400
      focus:invalid:border-rose-400 focus:invalid:ring-rose-400"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200
      invalid:border-rose-400  invalid:text-rose-400
      focus:invalid:border-rose-400 focus:invalid:ring-rose-400"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
        <div className="container">
          <OrderPage orderItems={cartItems} onRemoveItem={handleRemoveItem} />
        </div>
        {showConfirmationModal && (
          <OrderConfirmationModal
            orderData={cartItems}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default CheckoutForm;

import { useNavigate } from "react-router-dom"; // For navigation after confirmation
import { v4 as uuidv4 } from "uuid";
import { IoCloseCircle } from "react-icons/io5";
import { useState } from "react";

const OrderPage = ({ orderItems, onRemoveItem }) => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = orderItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  // Handle order confirmation
  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
    setTimeout(() => {
      alert("Your order has been confirmed! Thank you for shopping with us.");
      navigate("/"); // Navigate back to the homepage or any other page
    }, 2000);
  };

  // Handle removing an item
  const handleRemoveItem = (id) => {
    if (onRemoveItem) {
      onRemoveItem(id); // Call the parent-provided function to update the cart
    }
  };

  if (!orderItems || orderItems.length === 0) {
    return (
      <p className="p-4 text-center">You haven't placed any orders yet.</p>
    );
  }

  return (
    <div className="p-4 border-2 mx-auto m-20 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white duration-200 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Your Order</h2>

      <div className="space-y-4">
        {orderItems.map((item) => (
          <div key={uuidv4()} className="flex gap-4 border-b pb-4">
            <img
              src={item.image_link || "https://via.placeholder.com/150"}
              alt={item.title || "Item Image"}
              className="w-32 h-32 object-cover"
            />
            <div>
              <h3 className="font-semibold">{item.title || "Unnamed Item"}</h3>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity || 1}</p>
              <p>
                Total: {item.price}
                {/* {(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)} */}
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 font-bold text-lg hover:text-red-700"
              aria-label={`Remove ${item.title}`}
            >
              <IoCloseCircle />
            </button>
          </div>
        ))}
        <div className="mt-4 flex justify-between font-bold">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        {/* Confirm Order Button
        <div className="mt-4 text-center">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-full"
            onClick={handleConfirmOrder}
            disabled={isOrderConfirmed}
          >
            {isOrderConfirmed ? "Order Confirmed!" : "Confirm Order"}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OrderPage;

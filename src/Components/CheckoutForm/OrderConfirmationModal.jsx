import React from "react";

const OrderConfirmationModal = ({ orderData, onClose }) => {
  const handleClose = () => {
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-2xl font-bold mb-4">Thank You for Your Order!</h3>
        <p className="text-lg">Order Summary:</p>
        <ul className="list-disc ml-6">
          {orderData.map((item) => (
            <li key={item.id} className="mt-2">
              {item.title} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">
          Estimated Delivery Date: {orderData.deliveryDate}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;

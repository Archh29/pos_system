import { useState } from 'react';
import ReactDOM from 'react-dom';

const QuantityModal = ({ onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    if (quantity > 0) {
      onSubmit(quantity);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Enter Quantity</h2>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="p-2 border mb-2"
        />
        <div>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded mr-2"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuantityModal;

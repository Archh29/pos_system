import { useState } from 'react';
import ReactDOM from 'react-dom';

const ManualEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = () => {
    if (barcode) {
      onSubmit(barcode);
      setBarcode('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Enter Barcode Manually</h2>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter Barcode"
          className="p-2 border mb-2 w-full"
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

export default ManualEntryModal;

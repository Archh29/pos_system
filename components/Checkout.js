import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BarcodeScanner from './BarcodeScanner';
import VoidingModal from './VoidingModal';
import QuantityModal from './QuantityModal';
import ManualEntryModal from './manualEntryModal';
import ReceiptModal from './ReceiptModal'; // Import the ReceiptModal
import useLocalStorage from '../hooks/useLocalStorage';
import SuspendResume from './suspendresume';
import Reports from './reports'; // Ensure you have this component

const calculateTotal = (items) => items.reduce((total, item) => total + item.price * item.quantity, 0);

const Checkout = ({ userRole, onLogout }) => {
  const [items, setItems] = useLocalStorage('items', []);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoiding, setIsVoiding] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [amountPaid, setAmountPaid] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(null); // State to hold change amount

  useEffect(() => {
    setTotal(calculateTotal(items));
    setIsLoading(false);
  }, [items]);

  const updateItems = (newItems) => {
    setItems(newItems);
    setTotal(calculateTotal(newItems));
  };

  const fetchProductByCode = async (code) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('operation', 'getProductByCode');
      formData.append('code', code);

      const response = await axios.post('http://localhost/product/products.php', formData);

      if (response.data.error) {
        setError(response.data.error);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching product by code:', error);
      setError('An error occurred while fetching the product.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleScan = useCallback(async (code) => {
    const newProduct = await fetchProductByCode(code);
    if (newProduct) {
      setSelectedProduct(newProduct);
      setShowQuantityModal(true);
    } else {
      alert('Product not found');
    }
  }, []);

  const handleManualEntry = async (barcode) => {
    const product = await fetchProductByCode(barcode);
    if (product) {
      setSelectedProduct(product);
      setShowQuantityModal(true);
    } else {
      alert('Product not found');
    }
  };

  const handleQuantitySubmit = useCallback((quantity) => {
    if (selectedProduct) {
      const newProduct = { 
        code: selectedProduct.product_code, 
        name: selectedProduct.product_name, 
        price: selectedProduct.product_price, 
        quantity 
      };
      updateItems([...items, newProduct]);
      setShowQuantityModal(false);
      setSelectedProduct(null);
    }
  }, [selectedProduct, items]);

  const handleVoid = useCallback((code) => {
    const updatedItems = items.filter(item => item.code !== code);
    updateItems(updatedItems);
  }, [items]);

  const handlePayment = useCallback(() => {
    const paid = parseFloat(amountPaid);
    if (isNaN(paid) || paid < total) {
      alert('Insufficient funds');
      return null;
    }
    return (paid - total).toFixed(2);
  }, [amountPaid, total]);

  const handleAmountChange = (e) => setAmountPaid(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const calculatedChange = handlePayment();
      if (calculatedChange === null) {
        // Payment failed, alert shown
        return;
      }
      console.log('Items:', items); // Debugging line
      console.log('Total:', total); // Debugging line
      console.log('Amount Paid:', amountPaid); // Debugging line
      console.log('Change:', calculatedChange); // Debugging line
      setChange(calculatedChange); // Set change amount
      setShowReceiptModal(true); // Show receipt modal
    }
  };

  const handleLogout = useCallback(() => {
    // Clear items from local storage
    localStorage.removeItem('items');
    setItems([]);
    onLogout();
  }, [onLogout]);

  const handleReset = useCallback(() => {
    // Reset items and amount paid
    setItems([]);
    setAmountPaid('');
    setChange(null);
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">POS SYSTEM</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </header>

      <div className="grid grid-cols-5 gap-4 mt-4">
        <div className="col-span-3">
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <BarcodeScanner onScan={handleScan} />

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Items:</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 border">Barcode</th>
                      <th className="py-2 border">Item Name</th>
                      <th className="py-2 border">Quantity</th>
                      <th className="py-2 border">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 ? (
                      items.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td className="py-2 border">{item.code}</td>
                          <td className="py-2 border">{item.name}</td>
                          <td className="py-2 border">{item.quantity}</td>
                          <td className="py-2 border">₱{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-2 border text-center">No items scanned yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-8 bg-white shadow rounded mb-4">
            <button
              onClick={() => setShowManualEntryModal(true)}
              className="bg-green-500 text-white w-full mb-2"
            >
              Enter Barcode Manually
            </button>
            <button onClick={() => setIsVoiding(true)} className="bg-red-500 text-white w-full mb-2">
              Void Item
            </button>
            <div className="mt-4">
              <p className="text-xl font-semibold">Total: ₱{total.toFixed(2)}</p>
            </div>
            <input
              type="number"
              value={amountPaid}
              placeholder="Amount Paid"
              onChange={handleAmountChange}
              onKeyDown={handleKeyDown}
              className="mt-2 p-2 border w-full"
            />
            <SuspendResume items={items} setItems={setItems} />
            {userRole === 'admin' && <Reports />}
          </div>
        </div>
      </div>

      <VoidingModal isOpen={isVoiding} onClose={() => setIsVoiding(false)} onVoid={handleVoid} />
      <ReceiptModal 
        isOpen={showReceiptModal} 
        onClose={() => { 
          setShowReceiptModal(false); 
          handleReset(); // Reset state when modal closes
        }}
        items={items}
        total={total}
        amountPaid={amountPaid}
        change={change}
        onReset={handleReset} // Pass the reset function
      />
      {showQuantityModal && (
        <QuantityModal onClose={() => setShowQuantityModal(false)} onSubmit={handleQuantitySubmit} />
      )}
      <ManualEntryModal
        isOpen={showManualEntryModal}
        onClose={() => setShowManualEntryModal(false)}
        onSubmit={handleManualEntry}
      />
    </div>
  );
};

export default Checkout;

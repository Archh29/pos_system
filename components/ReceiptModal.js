import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// Helper function to format numbers
const formatCurrency = (value) => {
  return (parseFloat(value) || 0).toFixed(2);
};

const ReceiptModal = ({ isOpen, onClose, items, total, amountPaid, change, onReset }) => {
  useEffect(() => {
    if (isOpen) {
      console.log("ReceiptModal opened with items:", items);
      const insertSalesData = async () => {
        try {
          // Insert into tbl_sales and get the sales_id
          const salesResponse = await axios.post('http://localhost/product/insert_sales.php', {
            operation: 'insertSales',
            sales_userId: 1, // Assuming the user ID is 1 for example
            sales_product: JSON.stringify(items.map(item => item.code)),
            sales_qty: JSON.stringify(items.map(item => item.quantity)),
            sales_totalAmount: total
          });

          if (salesResponse.data.error) {
            throw new Error(salesResponse.data.error);
          }

          const salesId = salesResponse.data.sales_id;

          // Insert into tbl_sales_item using the sales_id
          for (const item of items) {
            const salesItemResponse = await axios.post('http://localhost/product/insert_sales_item.php', {
              operation: 'insertSalesItem',
              sales_itemId: salesId,
              sales_cashtendered: amountPaid,
              sales_change: change
            });

            if (salesItemResponse.data.error) {
              throw new Error(salesItemResponse.data.error);
            }
          }

          console.log('Sales data inserted successfully');
          onReset(); // Notify parent component to reset state
        } catch (error) {
          console.error('Error inserting sales data:', error);
        }
      };

      insertSalesData();
    }
  }, [isOpen, items, total, amountPaid, change, onReset]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Receipt"
      className="fixed inset-0 bg-white p-4 max-w-lg mx-auto mt-20 rounded shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Receipt</h2>
      <table className="min-w-full bg-white border mb-4">
        <thead>
          <tr>
            <th className="py-2 border">Item Name</th>
            <th className="py-2 border">Quantity</th>
            <th className="py-2 border">Price</th>
            <th className="py-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 border">{item.name}</td>
              <td className="py-2 border">{item.quantity}</td>
              <td className="py-2 border">₱{formatCurrency(item.price)}</td>
              <td className="py-2 border">₱{formatCurrency(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-4">
        <p className="text-lg font-semibold">Total: ₱{formatCurrency(total)}</p>
        <p className="text-lg font-semibold">Amount Paid: ₱{formatCurrency(amountPaid)}</p>
        <p className="text-lg font-semibold">Change: ₱{formatCurrency(change)}</p>
      </div>
      <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
    </Modal>
  );
};

export default ReceiptModal;

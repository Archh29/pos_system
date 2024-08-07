import React, { useState } from 'react';
import axios from 'axios';

const VoidingModal = ({ isOpen, onClose, onVoid }) => {
  const [code, setCode] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleVoid = async () => {
    const isAdminAuthenticated = await authenticateAdmin(adminUsername, adminPassword);
    
    if (isAdminAuthenticated) {
      onVoid(code);
      setCode('');
      setAdminUsername('');
      setAdminPassword('');
      setAuthError('');
      onClose();
    } else {
      setAuthError('Invalid admin credentials');
    }
  };

  const authenticateAdmin = async (username, password) => {
    try {
      const jsonData = JSON.stringify({ username, password });
      const formData = new FormData();
      formData.append("json", jsonData);
      formData.append("operation", "adminLogin");
      
      const response = await axios.post(
        'http://localhost/product/users.php',
        formData
      );

      return response.data.isAuthenticated;
    } catch (error) {
      console.error('Error during admin authentication:', error);
      return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold">Void Item</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Item Code"
          className="mt-2 p-2 border"
        />
        <input
          type="text"
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
          placeholder="Admin Username"
          className="mt-2 p-2 border"
        />
        <input
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Admin Password"
          className="mt-2 p-2 border"
        />
        {authError && <p className="text-red-500">{authError}</p>}
        <button
          onClick={handleVoid}
          className="mt-2 p-2 bg-red-500 text-white"
        >
          Void
        </button>
        <button
          onClick={onClose}
          className="mt-2 p-2 bg-gray-500 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VoidingModal;

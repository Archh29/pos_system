import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = {
        username: username,
        password: password
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "login");

      const response = await axios.post('http://localhost/product/users.php', formData);

      console.log('Response:', response.data); // Log entire response

      if (response.data.role) {
        onLogin(response.data.role);
        if (response.data.role === 'admin') {
          router.push('./admindashboard'); // Correct path
        } else {
          router.push('/'); // Redirect to home or regular dashboard
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during request:', error);
      if (error.response) {
        alert(error.response.data.error);
      } else if (error.request) {
        alert('No response received from server');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border w-full"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

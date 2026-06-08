import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/daily-image" element={<h1>Daily Image</h1>} />
      <Route path="/random-image" element={<h1>Random Image</h1>} />
      <Route path="/login-page" element={<Login />} />
      <Route path="/register-page" element={<Register />} />
      {/* <Route path="/admin-page" element={<h1>Admin Page</h1>} /> */}
    </Routes>
  );
}
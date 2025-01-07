
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Building from './Building';
import RegisterPage from './register';
import ResetPassword from './resetpassword';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/building" element={<Building />} />
         <Route path="/register" element={<RegisterPage />} />
     
      <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;

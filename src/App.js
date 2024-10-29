// // import React from 'react';
// // import './App.css';
// // import Building from './components/Building';

// // function App() {
// //   return (
// //     <div className="App">
// //       <h1>Professional Blueprint of Building</h1>
// //       <Building />
// //     </div>
// //   );
// // }

// // export default App;
// import React from 'react';

// import Login from './login';
// import './App.css';

// import RegisterPage from './register';
// import ResetPassword from './resetpassword';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/" element={<Login />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//       <Route path="/login" element={<Login />} />
     
//     </Routes>
//   );
// };

// export default App;
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

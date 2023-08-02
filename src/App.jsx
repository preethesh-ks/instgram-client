
import Login from './components/Login/Login';
import Post from './components/Post/Post';
import Register from './components/Register/Register';
import Home from './pages/Home';

import { Routes,Route,Navigate,BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

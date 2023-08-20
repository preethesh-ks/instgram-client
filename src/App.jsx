
import Login from './components/Login/Login';
import Post from './components/Post/Post';
import Register from './components/Register/Register';
import Home from './pages/Home';
import Comment from './pages/Comment';
import { Routes,Route,Navigate,BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store';
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<Post />} />
            <Route path="/comment" element={<Comment />} />
            {/* <Route path="/welcome" element={<Post/>} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

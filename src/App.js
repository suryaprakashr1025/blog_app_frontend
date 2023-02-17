import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcomdashboard from './Welcomdashboard';
import Login from './Login';
import Register from './Register';
import ChangePassword from './Changepassword';
import Forgetpassword from './Forgetpassword';
import Home from './Home';
import Blog from './Blog';
import Readblog from './Readblog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcomdashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
        </Route>
        <Route path="/blog" element={<Blog />} />
        <Route path="/readblog/:blogid" element={<Readblog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

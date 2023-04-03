import {Routes, Route} from 'react-router-dom'
import AdminRoute from './components/Routes/AdminRoutes';
import PrivateRoute from './components/Routes/Private';
import About from './pages/About';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import Dashboard from './pages/user/Dashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/search' element={<Search />} />

      <Route path='/dashboard' element={<PrivateRoute />} >
        <Route path='user' element={<Dashboard />} />
        <Route path='user/orders' element={<Orders />} />
        <Route path='user/profile' element={<Profile />} />
      </Route>

      <Route path='/dashboard' element={<AdminRoute />} >
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/product/:slug' element={<UpdateProduct />} />
        <Route path='admin/products' element={<Products />} />
        <Route path='admin/users' element={<Users />} />
      </Route>
      
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='*' element={<Pagenotfound />} />
    </Routes>


    </>
  );
}

export default App;


// 04.09.26 till admin panel next is create admin page in admin folder

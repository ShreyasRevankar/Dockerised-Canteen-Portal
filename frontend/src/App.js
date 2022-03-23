import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

// import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
// import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import SignUp from "./components/common/SignUp";
import SignInSide from "./components/common/SignIn";
import Menu from "./components/users/Menu";
import Wallet from "./components/users/Wallet";
import Edit from "./components/food/Edit";
import Orders from "./components/users/Orders";
import MyOrders from "./components/users/MyOrders";
import Dashboard from "./components/users/BDashboard";
import Statistics from "./components/users/Statistics";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="users" element={<UsersList />} /> */}
          {/* <Route path="register" element={<Register />} /> */}
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignInSide />} />
          <Route path="profile" element={<Profile />} />
          <Route path="menu" element={<Menu />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="edit" element={<Edit />} />
          <Route path="order" element={<Orders />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Navbar/Footer";
import Header from "./components/Navbar/Header";
import Promotion from "./components/Navbar/Promotion";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import NoPageFound from "./pages/NoPageFound";
import ProtectedForPayment from "./auth/ProtectedForPayment";
import WishList from "./components/wishlist/WishList";
import ProtectedStillLogin from "./auth/ProtectedStillLogin";

function App() {
  return (
    <>
      <Promotion />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedForPayment />}>
          <Route path="/payment" element={<Payment />} />
        </Route>
        {/* <Route element={<ProtectedStillLogin />}> */}
          <Route path="/login" element={<Login />} />
        {/* </Route> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/*" element={<NoPageFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

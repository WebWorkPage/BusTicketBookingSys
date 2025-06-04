import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddBus from './components/AddBus';
import BusList from './components/BusList';
import EditBus from './components/EditBus';
import BookTicket from './components/BookTicket';
import BookingHistory from './components/BookingHistory';
import Payment from './components/Payment';
import UserList from './components/UserList.js';
import EditUser from './components/EditUser.js';
import PaymentHistory from './components/PaymentHistory.js';

function App() {
  return (
    <div className="App">
     <Router>
      {/* <Home/> */}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Register/>} />
        <Route exact path="/page/login" element={<Login/>} />

        <Route exact path="/dashboard" element={<Dashboard/>} />

        <Route exact path="/addbus" element={<AddBus/>} />
        <Route exact path="/buslist" element={<BusList/>} />
        <Route exact path="/editbus/:busId/:userId" element={<EditBus/>} />

        <Route exact path="/bookticket/:busId/:userId" element={<BookTicket/>} />
        <Route exact path="/bookinghistory" element={<BookingHistory/>} />
         <Route exact path="/bookinghistory/:userId" element={<BookingHistory/>} />

        <Route exact path="/payment" element={<Payment/>} />
        <Route exact path="/paymenthistory" element={<PaymentHistory/>} />
        <Route exact path="/paymenthistory/:userId" element={<PaymentHistory/>} />

        <Route exact path="/userlist" element={<UserList/>} />
        <Route exact path="/edituser/:userId" element={<EditUser/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;

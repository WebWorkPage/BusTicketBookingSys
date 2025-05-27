import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddBus from './components/AddBus';
import EditBus from './components/EditBus';
import BookTicket from './components/BookTicket';
import BookingHistory from './components/BookingHistory';
import Payment from './components/Payment';

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
        <Route exact path="/editbus/:id" element={<EditBus/>} />
        <Route exact path="/bookticket/:id" element={<BookTicket/>} />
        <Route exact path="/bookinghistory" element={<BookingHistory/>} />
        <Route exact path="/payment" element={<Payment/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;

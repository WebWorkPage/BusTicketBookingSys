import Navbar from "./Navbar";

const Home = () => {

   const styles = {
        minHeight: "50vh",
        // backgroundImage: "url('https://www.shutterstock.com/image-vector/smart-bus-ticket-online-booking-600nw-2612106615.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return(
        <>
          <Navbar/>
          <div className="d-flex justify-content-center align-items-center text-center p-4" style={styles}>
            <img src="https://www.shutterstock.com/image-vector/smart-bus-ticket-online-booking-600nw-2612106615.jpg"
            style={{height:"598px", width:"910px"}}/>
            <h1 className="text-black fs-4">Welcome, Book Bus Ticket Online</h1>
          </div>
        </>
    )
}

export default Home;
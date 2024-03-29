import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Reviews from "./pages/Reviews";
import Admin from "./pages/Admin";
import Contacts from "./pages/Contacts";
import AdminEdit from "./pages/AdminEdit";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />

          <Route path="/reviews" element={<Reviews />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit/:reviewId" element={<AdminEdit />}></Route>

          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

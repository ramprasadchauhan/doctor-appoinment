import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

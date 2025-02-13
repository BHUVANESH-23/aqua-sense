import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import Quiz from "./Pages/Quiz";
import { SidebarProvider } from "./Components/ui/sidebar"; // Ensure correct import

function App() {
  return (
    <Router>
      <SidebarProvider>  {/* ✅ Moved outside <Routes> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Quiz />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;

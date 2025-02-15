import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import Quiz from "./Pages/Quiz";
import ProtectedRoute from "./Sections/ProtectedRoute";
import { SidebarProvider } from "./Components/ui/sidebar";
import WaterCycle from "./QuizSections/WaterCycle";
import WaterConservation from "./QuizSections/WaterConservation";
import WaterSources from "./QuizSections/WaterSources";
import WaterPollution from "./QuizSections/WaterPollution";
import GroundWater from "./QuizSections/GroundWater";
import WaterHarvesting from "./QuizSections/WaterHarvesting";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <SidebarProvider>
                <Quiz />
              </SidebarProvider>
            }
          />
          <Route path="/quiz/1" element={<WaterCycle />} />
          <Route path="/quiz/2" element={<WaterConservation />} />
          <Route path="/quiz/3" element={<WaterSources />} />
          <Route path="/quiz/4" element={<WaterPollution />} />
          <Route path="/quiz/5" element={<WaterHarvesting/>}/>
          <Route path="/quiz/6" element={<GroundWater />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

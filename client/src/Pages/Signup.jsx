import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Card, CardContent } from "../Components/ui/card";
import loginBG from "../assets/login-bg.jpg";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { position: "top-right", autoClose: 3000 });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://aqua-sense.onrender.com/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(response.data.message, { position: "top-right", autoClose: 3000 });

      setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed", { position: "top-right", autoClose: 3000 });
      } else {
        toast.error("Network error", { position: "top-right", autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${loginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-4/12 p-10 shadow-lg bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-12 mb-6"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 mb-6"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 mb-6"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full h-12 mb-6"
            />
            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <p className="text-center mt-3 text-md">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}

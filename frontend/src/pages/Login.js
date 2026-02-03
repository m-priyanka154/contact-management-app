import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, error, setError, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;

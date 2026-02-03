import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={onChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>

      <div className="link">
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Register;

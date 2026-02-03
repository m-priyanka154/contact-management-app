import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useAuth } from "../context/AuthContext";
import ContactItem from "../components/ContactItem";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { contacts, addContact } = useContacts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addContact(formData);
    setFormData({ name: "", email: "", phone: "", notes: "" });
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <h2>My Contacts</h2>
        <button
          style={{ width: "120px" }}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div className="contact-form">
        <form onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={onChange}
          />
          <input
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={onChange}
          />
          <button type="submit">Add Contact</button>
        </form>
      </div>

      <div className="contact-list">
        {contacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

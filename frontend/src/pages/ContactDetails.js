import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contacts, updateContact, deleteContact } = useContacts();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const contact = contacts.find((c) => c._id === id);
    if (contact) {
      setFormData(contact);
    }
  }, [id, contacts]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((tag) => tag.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSave = () => {
    updateContact(id, formData);
    navigate("/dashboard");
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(id);
      navigate("/dashboard");
    }
  };

  if (!formData) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="contact-details-wrapper">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="contact-details-container">
        <h2>Contact Details</h2>

        <form className="contact-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email || ""}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              name="company"
              value={formData.company || ""}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              name="tags"
              value={formData.tags?.join(", ") || ""}
              onChange={onChange}
              placeholder="e.g. friend, work, vip"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={onChange}
              rows="5"
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn-delete" onClick={onDelete}>
              Delete
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="button" className="btn-save" onClick={onSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactDetails;

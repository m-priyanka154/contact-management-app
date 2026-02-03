import { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useAuth } from "../context/AuthContext";
import ContactTableRow from "../components/ContactTableRow";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { contacts, addContact } = useContacts();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    tags: "",
    notes: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    addContact({
      ...formData,
      tags: tagsArray,
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      tags: "",
      notes: "",
    });
    setShowForm(false);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  return (
    <div className="dashboard">
      <div className="top-bar">
        <h2>My Contacts</h2>
        <div className="top-buttons">
          <button
            className="btn-add"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add New Contact"}
          </button>
          <button
            className="btn-logout"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="contact-form">
          <h3>Add New Contact</h3>
          <form onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                name="tags"
                placeholder="e.g. friend, work, vip"
                value={formData.tags}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={onChange}
                rows="3"
              />
            </div>

            <button type="submit" className="btn-submit">
              Add Contact
            </button>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        {contacts.length === 0 ? (
          <p className="no-contacts">No contacts found. Add one to get started!</p>
        ) : (
          <>
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Favorite</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.map((contact) => (
                  <ContactTableRow key={contact._id} contact={contact} />
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={currentPage === page ? "active" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

            <div className="contact-stats">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, contacts.length)} of {contacts.length}{" "}
              contacts
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

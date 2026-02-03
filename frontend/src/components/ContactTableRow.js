import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

function ContactTableRow({ contact }) {
  const navigate = useNavigate();
  const { toggleFavorite, deleteContact } = useContacts();

  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.phone || "—"}</td>
      <td>{contact.email || "—"}</td>
      <td className="favorite-cell">
        <button
          className="favorite-btn"
          onClick={() => toggleFavorite(contact._id)}
          title={contact.favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {contact.favorite ? "★" : "☆"}
        </button>
      </td>
      <td className="actions-cell">
        <button
          className="btn-view"
          onClick={() => navigate(`/contact/${contact._id}`)}
        >
          View/Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm("Delete this contact?")) {
              deleteContact(contact._id);
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ContactTableRow;

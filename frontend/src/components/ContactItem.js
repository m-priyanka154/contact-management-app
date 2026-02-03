import { useState } from "react";
import { useContacts } from "../context/ContactContext";

function ContactItem({ contact }) {
  const { deleteContact, updateContact } = useContacts();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(contact);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSave = () => {
    updateContact(contact._id, formData);
    setEdit(false);
  };

  if (edit) {
    return (
      <div className="contact-card">
        <input name="name" value={formData.name} onChange={onChange} />
        <input name="email" value={formData.email || ""} onChange={onChange} />
        <input name="phone" value={formData.phone || ""} onChange={onChange} />
        <input name="notes" value={formData.notes || ""} onChange={onChange} />
        <button onClick={onSave}>Save</button>
      </div>
    );
  }

  return (
    <div className="contact-card">
      <h4>{contact.name}</h4>
      {contact.email && <p>Email: {contact.email}</p>}
      {contact.phone && <p>Phone: {contact.phone}</p>}
      {contact.notes && <p>Notes: {contact.notes}</p>}
      <button onClick={() => setEdit(true)}>Edit</button>
      <button onClick={() => deleteContact(contact._id)}>Delete</button>
    </div>
  );
}

export default ContactItem;

import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const getContacts = async () => {
    try {
      const res = await API.get("/contacts");
      setContacts(res.data);
    } catch (err) {
      setError("Failed to load contacts");
    }
  };

  const addContact = async (contactData) => {
    try {
      const res = await API.post("/contacts", contactData);
      setContacts([res.data, ...contacts]);
    } catch (err) {
      setError("Failed to add contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      setError("Failed to delete contact");
    }
  };

  const updateContact = async (id, updatedData) => {
    try {
      const res = await API.put(`/contacts/${id}`, updatedData);
      setContacts(
        contacts.map((c) => (c._id === id ? res.data : c))
      );
    } catch (err) {
      setError("Failed to update contact");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{ contacts, addContact, deleteContact, updateContact, error }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);

import React, { useState, useEffect } from 'react';
import { AddContact } from './AddContact/AddContact';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadContactsFromLocalStorage();
  }, []);

  useEffect(() => {
    saveContactsToLocalStorage();
  }, [contacts]);

  const loadContactsFromLocalStorage = () => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  };

  const saveContactsToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const addContactMarkup = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (contactExists) {
      alert('This contact already exists');
    } else {
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    const lowCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  const onClickDelBtn = currentID => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== currentID)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <AddContact onSubmit={addContactMarkup} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={onFilterChange} />
      <ContactsList
        onClickDelBtn={onClickDelBtn}
        contacts={visibleContacts()}
      />
    </Container>
  );
}

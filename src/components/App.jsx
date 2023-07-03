import React, { useState, useEffect } from 'react';
import { AddContact } from './AddContact/AddContact';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactMarkup = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert('This contact already exists')
      : setContacts([newContact, ...contacts]);
  };

  const visibleContacts = () => {
    const lowCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  const onClickDelBtn = currentID => {
    setContacts(contacts.filter(contact => contact.id !== currentID));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <AddContact onSubmit={data => addContactMarkup(data)} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={e => setFilter(e.currentTarget.value)} />
      <ContactsList
        onClickDelBtn={onClickDelBtn}
        contacts={visibleContacts()}
      />
    </Container>
  );
}

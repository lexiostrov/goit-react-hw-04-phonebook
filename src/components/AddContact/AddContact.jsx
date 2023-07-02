import React, { useState } from 'react';
import { Label, Container, Btn } from './AddContainer.styled';
import PropTypes from 'prop-types';

export function AddContact({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dataState = {
    name,
    number,
  };

  const handleChange = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(dataState);
    reset();
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} name="AddContact">
      <Container>
        <Label>
          Name
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <input
            value={number}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
      </Container>
      <Btn type="submit">Add Contact</Btn>
    </form>
  );
}

AddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

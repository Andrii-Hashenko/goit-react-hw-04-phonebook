import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import './container.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];


export default function App() {
  const itemsContact = () => {
    return JSON.parse(localStorage.getItem('contacts')) || initialContacts;
  };
  const [contacts, setContacts] = useState(itemsContact());
  const [filter, setFilter] = useState('');
  console.log(contacts);
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    setFilter('');
  };

  return (
    <div className="Container">
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2> Contacts : </h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContactList={deleteContact}
      />
    </div>
  );
}



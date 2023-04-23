import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getContactsValue } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { getFilterValue } from 'redux/filterSlice';
import style from '../Contacts/Contacts.module.css';

export const Contacts = () => {
  const contacts = useSelector(getContactsValue);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();
  const handleDelete = id => dispatch(deleteContact(id));
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ul className={style.list}>
        {filterContacts.map(({ name, id, number }) => {
          return (
            <li className={style.item} key={id}>
              {name}: {number}
              <button
                className={style.btn}
                key={id}
                type="button"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

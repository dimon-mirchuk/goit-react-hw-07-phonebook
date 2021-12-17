import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem";
import { useGetContactsQuery } from "../../Redux/contacts/contactsSlice";
import { filterValue } from "../../Redux/contacts/contacts-selectors";
import styles from "./ContactList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import slideTransition from "../../Transitions/slide.module.css";

const { list } = styles;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { data, isLoading } = useGetContactsQuery();
  const value = useSelector(filterValue);

  useEffect(() => {
    try {
      setContacts(
        data.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } catch (error) {
      return error;
    }
  }, [data, value]);

  return (
    <>
      <TransitionGroup className={list} component="ul">
        {contacts.map((contact) => (
          <CSSTransition
            key={contact.id}
            timeout={500}
            classNames={slideTransition}
            unmountOnExit
          >
            <ContactListItem key={contact.id} contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {isLoading && <h2>Loading...</h2>}
    </>
  );
};

ContactList.propTypes = {
  value: PropTypes.string,
  useGetContactsQuery: PropTypes.func,
};

export default ContactList;

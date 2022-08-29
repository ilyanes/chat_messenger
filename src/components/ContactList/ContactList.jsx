import ContactListItem from "../ContactListItem/ContactListItem";
import style from "./ContactList.module.css";
function ContactList({ friends, findContact }) {
  return (
    // <div className={style.listUl}>
    <ul className={style.listUl}>
      <h2 className={style.contactListTitle}>Chats</h2>
      {friends.map(({ avatar, name, id, msgs }) => (
        <ContactListItem
          findContact={findContact}
          avatar={avatar}
          name={name}
          id={id}
          key={id}
          msgs={msgs}
        />
      ))}
    </ul>
  );
}

export default ContactList;

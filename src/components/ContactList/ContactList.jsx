import ContactListItem from "../ContactListItem/ContactListItem";
import style from "./ContactList.module.scss";
function ContactList({ friends, findContact }) {
  return (
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

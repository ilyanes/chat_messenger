import ContactListItem from "../ContactListItem/ContactListItem";

function ContactList({ friends, findContact }) {
  return (
    <ul>
      <h3>Chats</h3>
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

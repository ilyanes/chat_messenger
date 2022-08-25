import ContactListItem from "../ContactListItem/ContactListItem";

function ContactList({ friends }) {
  return (
    <ul>
      <h3>Chats</h3>
      {friends.map(({ avatar, name, id, msgs }) => (
        <ContactListItem avatar={avatar} name={name} key={id} msgs={msgs} />
      ))}
    </ul>
  );
}

export default ContactList;

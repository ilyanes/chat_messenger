const Chat = ({ items }) => {
  return (
    <div>
      <h2>Chat Msg</h2>
      {items.map(({ id, messages }) => (
        <p key={id}>{messages}</p>
      ))}
    </div>
  );
};

export default Chat;

// const Chat = ({ items }) => {
//   const elements = items.map(({ message, id }) => {
//     return <p key={id}>{message}</p>;
//   });
//   return <div>{elements}</div>;
// };

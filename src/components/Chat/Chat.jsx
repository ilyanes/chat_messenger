import style from "./Chat.module.scss";

const Chat = ({ items, headerContact }) => {
  return (
    <div>
      <div className={style.chatHeader}>
        <div className={style.chatImg}>
          <img src={headerContact.avatar} alt="" width="60px" height="35px" />
        </div>
        <h2 className={style.chatName}>{headerContact.name}</h2>
      </div>
      <div className={style.chat}>
        {items.map(({ id, messages }) => (
          <p key={id} id={id} className={style.youMessage}>
            {messages}
          </p>
        ))}
      </div>
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

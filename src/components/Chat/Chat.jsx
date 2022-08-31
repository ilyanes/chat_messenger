import style from "./Chat.module.scss";
import ChatItem from "./ChatItem";

const Chat = ({ items, headerContact }) => {
  return (
    <div>
      <div className={style.chatHeader}>
        <div className={style.chatImg}>
          <img src={headerContact.avatar} alt="" width="60px" height="35px" />
        </div>
        <h2 className={style.chatName}>{headerContact.name}</h2>
      </div>
      <div className={style.chatArea}>
        <ul className={style.chatLi}>
          {items.map(({ id, messages, type, fullDate }) => {
            return (
              <ChatItem
                key={id}
                messages={messages}
                type={type}
                fullDate={fullDate}
                headerContact={headerContact}
              ></ChatItem>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Chat;

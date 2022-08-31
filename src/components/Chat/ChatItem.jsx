import style from "./Chat.module.scss";

export default function ChatItem({
  id,
  messages,
  type,
  fullDate,
  headerContact,
}) {
  return type === "user" ? (
    <li key={id}>
      <div className={style.youDiv}>
        <div>
          <p className={style.youMessage}>{messages}</p>
          <p className={style.youP}>{fullDate}</p>
        </div>
      </div>
    </li>
  ) : (
    <li key={id}>
      <div className={style.userDiv}>
        <div className={style.userDivLayout}>
          <div className={style.chatImg}>
            <img src={headerContact.avatar} alt="" width="60px" height="35px" />
          </div>
          <div>
            <p className={style.userMessage}>{messages}</p>
            <p className={style.userP}>{fullDate}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

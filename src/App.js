import style from "./App.module.scss";
import ContactList from "./components/ContactList";
import Profile from "./components/Profile";
import user from "./data/user.json";
import friends from "./data/friends.json";
import { useState } from "react";
import Filter from "./components/Filter/Filter";
import ChatForm from "./components/ChatForm/ChatForm";
import fetchAnswers from "./services/fetchAnswers";
import Chat from "./components/Chat/Chat";
import { nanoid } from "nanoid";
import moment from "moment";
import HeaderProfile from "./components/HeaderProfile/HeaderProfile";
import { useLocalStorage } from "./components/hooks/useLocalStorage";

const initContacts = { state: friends };
const initIndex = -1;

function App() {
  const [filter, setFilter] = useState("");
  const [chatContacts, setChatContacts] = useLocalStorage(
    "chatContacts",
    initContacts
  );
  const [indexOfContact, setindexOfContact] = useLocalStorage(
    "indexOfContact",
    initIndex
  );

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();

    return chatContacts.state.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const findContact = (id) => {
    const contacts = chatContacts.state.findIndex(
      (contact) => contact.id === id
    );
    console.log("click", contacts);
    setindexOfContact(contacts);
  };

  const addMessage = async () => {
    const chak = await fetchAnswers();
    const newMessage = {
      id: nanoid(),
      fullDate: moment().format("MM/DD/YY, h:mm A"),
      shortDate: moment().format("MMM DD, YYYY"),
      unixTime: moment().format("X"),
      type: "friend",
      messages: chak,
    };

    setChatContacts((prev) => {
      return {
        state: prev.state.map((el, index) => {
          if (index === 0) {
            return { ...el, msgs: [...el.msgs, newMessage] };
          } else {
            return el;
          }
        }),
      };
    });
  };

  function addMessageWithTimeout() {
    setTimeout(() => {
      addMessage();
    }, 15000);
  }

  const addFormMessage = (contact) => {
    const formMessage = {
      id: nanoid(),
      fullDate: moment().format("MM/DD/YY, h:mm A"),
      shortDate: moment().format("MMM DD, YYYY"),
      unixTime: moment().format("X"),
      type: "user",
      ...contact,
    };
    setChatContacts((prev) => {
      [prev.state[0], prev.state[indexOfContact]] = [
        prev.state[indexOfContact],
        prev.state[0],
      ];

      return {
        state: prev.state.map((el, index) => {
          if (index === 0) {
            return { ...el, msgs: [...el.msgs, formMessage] };
          } else {
            return el;
          }
        }),
      };
    });
    setindexOfContact(0);
  };

  return (
    <div className={style.App}>
      <div className={style.appBar}>
        <HeaderProfile>
          <Profile userAvatar={user.avatar}></Profile>
          <Filter value={filter} onChange={changeFilter}></Filter>
        </HeaderProfile>
        <ContactList
          findContact={findContact}
          friends={getFilterContacts() ?? chatContacts}
        ></ContactList>
      </div>
      {indexOfContact !== -1 && (
        <div className={style.chat}>
          <Chat
            items={chatContacts.state[indexOfContact].msgs}
            headerContact={chatContacts.state[indexOfContact]}
          ></Chat>
          <ChatForm
            onSubmit={function (contact) {
              addFormMessage(contact);
              addMessageWithTimeout();
            }}
          ></ChatForm>
        </div>
      )}
    </div>
  );
}

export default App;

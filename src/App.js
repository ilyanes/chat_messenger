import style from "./App.module.scss";
import ContactList from "./components/ContactList";
import Profile from "./components/Profile";
import user from "./data/user.json";
import friends from "./data/friends.json";
import { useEffect, useState } from "react";
import Filter from "./components/Filter/Filter";
import ChatForm from "./components/ChatForm/ChatForm";
import fetchAnswers from "./services/fetchAnswers";
import Chat from "./components/Chat/Chat";
import { nanoid } from "nanoid";
import moment from "moment";
import HeaderProfile from "./components/HeaderProfile/HeaderProfile";
import { useLocalStorage } from "./components/hooks/useLocalStorage";

// const localChatContacts = JSON.parse(localStorage.get("chatContacts"));
// const localIndex = JSON.parse(localStorage.get("indexOfContact"));
const initContacts = { state: friends };
const initIndex = -1;

console.log("init", initContacts);
function App() {
  const [filter, setFilter] = useState("");
  // const [chatContacts, setChatContacts] = useState({ state: friends });
  // const [indexOfContact, setindexOfContact] = useState(-1);
  // const [found_contact, set_found_contact] = useState({});
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

  function sortContact() {
    chatContacts.state.sort((a, b) =>
      a.msgs[a.msgs.length - 1].unixTime > b.msgs[b.msgs.length - 1].unixTime
        ? 1
        : -1
    );
  }

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
    // const contactId = chatContacts.state.find((contact) => contact.id === id);
    console.log("click", contacts);
    // console.log("contactId", contactId);
    setindexOfContact(contacts);
    // set_found_contact(contactId);
    // set_found_contact({ state: chatContacts.state[contacts] });
    // console.log(found_contact);
  };
  // const findContact = (id) => {
  //   const contacts = chatContacts.state.findIndex(
  //     (contact) => contact.id === id
  //   );
  //   const contactId = chatContacts.state.find((contact) => contact.id === id);
  //   console.log("click", contacts);
  //   console.log("contactId", contactId);
  //   setindexOfContact(contacts);
  //   set_found_contact(chatContacts.state[contacts]);
  //   // set_found_contact({ state: chatContacts.state[contacts] });
  //   console.log(found_contact);
  // };
  // console.log(indexOfContact);
  // console.log(chatContacts);
  // console.log(found_contact);

  // const deleteContact = (id) => {
  //   const idx = chatContacts.state.findIndex((contact) => contact.id === id);
  //   const [sliceContact] = chatContacts.state.splice(idx, 1);
  //   return sliceContact;
  // };

  const addMessage = async () => {
    // const [contacts] = chatContacts.state.splice(indexOfContact, 1);
    // e.preventdefault();

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
          if (index === indexOfContact) {
            return { ...el, msgs: [...el.msgs, newMessage] };
          } else {
            return el;
          }
        }),
      };
    });

    // set_found_contact((prev) => {
    //   prev.msgs = [...prev.msgs, newMessage];
    //   return {
    //     ...prev,
    //   };
    // });

    // const withNewMessage = found_contact.msgs.push(newMessage);
    // setChatContacts((prev) => {
    //   prev = prev.state.unshift(found_contact);
    //   return {
    //     ...prev,
    //   };
    // });
    // setChatContacts({
    //   // Добавить в начале массива
    //   state: contacts.unshift(found_contact),
    // });
    // set_found_contact((prev) => {
    //   return {
    //     state: { ...prev, msgs: [...state.msgs, newMessage] },
    //   };
    // });
  };

  function addMessageWithTimeout() {
    setTimeout(() => {
      addMessage();
    }, 5000);
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
      return {
        state: prev.state.map((el, index) => {
          if (index === indexOfContact) {
            return { ...el, msgs: [...el.msgs, formMessage] };
          } else {
            return el;
          }
        }),
      };
    });
  };
  console.log("chatContacts", chatContacts);

  // const addFormMessage = (contact) => {
  //   const formMessage = { id: nanoid(), ...contact };

  //   console.log("formMessage", formMessage);
  //   setChatContacts((prev) => {
  //     prev.state[indexOfContact].msgs = [
  //       ...prev.state[indexOfContact].msgs,
  //       formMessage,
  //     ];
  //     return {
  //       ...prev,
  //     };
  //   });
  //   console.log(chatContacts);
  // };
  // ];
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

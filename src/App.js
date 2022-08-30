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

// const fs = require("fs/promises");
// const path = require("path");

const App = () => {
  const [filter, setFilter] = useState("");
  const [chatContacts, setChatContacts] = useState({ state: friends });
  const [indexOfContact, setindexOfContact] = useState(-1);
  // const [isShow, setIsShow] = useState({ isShow: false });
  // const [messages, setMessages] = useState([]);
  const [found_contact, set_found_contact] = useState({});

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(chatContacts));
  //   localStorage.setItem("chat", JSON.stringify(chatContacts));
  // }, [chatContacts]);

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();

    return chatContacts.state.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.msgs[1].messages.includes(normalizedFilter)
    );
  };

  const findContact = (id) => {
    const contacts = chatContacts.state.findIndex(
      (contact) => contact.id === id
    );
    console.log("click", contacts);
    setindexOfContact(contacts);
    set_found_contact(chatContacts.state[contacts]);
    // set_found_contact({ state: chatContacts.state[contacts] });
    console.log(found_contact);
  };
  // console.log(indexOfContact);
  // console.log(chatContacts);
  // console.log(found_contact);

  // const deleteContact = (id) => {
  //   const idx = chatContacts.state.findIndex((contact) => contact.id === id);
  //   const [sliceContact] = chatContacts.state.splice(idx, 1);
  //   return sliceContact;
  // };

  const addMessage = async () => {
    const [contacts] = chatContacts.state.splice(indexOfContact, 1);
    // e.preventdefault();
    const chak = await fetchAnswers();
    const newMessage = {
      id: nanoid(),
      messages: chak,
    };

    set_found_contact((prev) => {
      prev.msgs = [...prev.msgs, newMessage];
      return {
        ...prev,
      };
    });

    // const withNewMessage = found_contact.msgs.push(newMessage);

    setChatContacts({
      // Добавить в начале массива
      state: contacts.unshift(found_contact),
    });
    // set_found_contact((prev) => {
    //   return {
    //     state: { ...prev, msgs: [...state.msgs, newMessage] },
    //   };
    // });
    console.log(chatContacts);
    console.log(found_contact);
  };

  function addMessageWithTimeout() {
    setTimeout(() => {
      addMessage();
    }, 2000);
  }

  const addFormMessage = (contact) => {
    setChatContacts((prev) => {
      const formMessage = { id: nanoid(), ...contact };
      console.log("formMessage", formMessage);
      prev.state[indexOfContact].msgs = [
        ...prev.state[indexOfContact].msgs,
        formMessage,
      ];
      return {
        ...prev,
      };
    });
    console.log(chatContacts);
  };

  // console.log("date", moment().format("MM/DD/YY, h:mm A"));
  // console.log("date", moment().format("MMM DD, YYYY"));

  return (
    <div className={style.App}>
      <div className={style.appBar}>
        <HeaderProfile>
          <Profile userAvatar={user.avatar}></Profile>
          <Filter value={filter} onChange={changeFilter}></Filter>
        </HeaderProfile>
        <ContactList
          findContact={findContact}
          friends={getFilterContacts()}
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
              // addFormMessage(contact);
              addMessageWithTimeout();
            }}
          ></ChatForm>
        </div>
      )}
    </div>
  );
};

export default App;

import "./App.css";
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

// const fs = require("fs/promises");
// const path = require("path");

const App = () => {
  const [filter, setFilter] = useState("");
  const [chatContacts, setChatContacts] = useState(friends);
  // const [isShow, setIsShow] = useState({ isShow: false });
  // const [messages, setMessages] = useState([]);
  const [found_contact, set_found_contact] = useState({ state: "" });

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(chatContacts));
  // }, [chatContacts]);

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();

    return chatContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.msgs[1].messages.includes(normalizedFilter)
    );
  };

  const findContact = async (id) => {
    const contacts = chatContacts.findIndex((contact) => contact.id === id);
    console.log("click", contacts);
    if (contacts !== -1) {
      set_found_contact({ state: chatContacts[contacts] });
    } else {
      set_found_contact({});
    }
  };
  console.log("found_contact", found_contact);

  const addMessage = async () => {
    const chak = await fetchAnswers();
    const newMessage = {
      id: nanoid(),
      messages: chak,
    };

    set_found_contact((prev) => {
      return {
        state: { ...prev, msgs: [...prev.state.msgs, newMessage] },
      };
    });
    // set_found_contact([
    //   ...found_contact.msgs,
    //   found_contact.msgs.push(newMessage),
    // ]);
  };

  function addMessageWithTimeout() {
    setTimeout(() => {
      addMessage();
    }, 10000);
  }

  const formM = (contact) => {
    const formMessage = { id: nanoid(), ...contact };
    set_found_contact((prev) => {
      return {
        state: { ...prev, msgs: [...prev.state.msgs, formMessage] },
      };
    });
  };

  return (
    <div className="App">
      <Profile userAvatar={user.avatar}></Profile>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        findContact={findContact}
        friends={getFilterContacts()}
      ></ContactList>
      {found_contact.state && (
        <>
          <Chat items={found_contact.state.msgs}></Chat>
          <ChatForm onSubmit={addMessageWithTimeout}></ChatForm>
        </>
      )}
    </div>
  );
};

export default App;

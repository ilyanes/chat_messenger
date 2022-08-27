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

// import fs from "fs/promises";
// import path from "path";
// const fs = require("jsonfile");
// const fs = require("fs/promises");
const fs = require("fs-extra");
const path = require("path");

const App = () => {
  const [filter, setFilter] = useState("");
  const [chatContacts, setChatContacts] = useState(friends);
  // const [isShow, setIsShow] = useState({ isShow: false });
  // const [messages, setMessages] = useState([]);
  const [found_contact, set_found_contact] = useState(null);

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(chatContacts));
  // }, [chatContacts]);

  // to do json
  const contactsPath = path.join(__dirname, "data", "friends.json");
  const updateContacts = async (contacts) => {
    await fs.writeJson(contactsPath, JSON.stringify(contacts, null, 2));
  };
  async function listContacts() {
    const dbContacts = await fs.readJson(contactsPath);
    return JSON.parse(dbContacts);
  }
  //

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

  const findContact = async (id, contact) => {
    // find to friends.json
    const conts = await listContacts();

    const contacts = chatContacts.findIndex((contact) => contact.id === id);
    console.log("click", contacts);
    if (contacts !== -1) {
      set_found_contact(chatContacts[contacts]);

      // find to friends.json
      conts[contacts] = { id, contact };
      await updateContacts(contacts);
    } else {
      set_found_contact(null);
    }
  };

  const addMessage = async (contact) => {
    // add to friends.json
    const contacts = await listContacts();

    const chak = await fetchAnswers();
    const newMessage = {
      id: nanoid(),
      messages: chak,
    };
    const formMessage = { id: nanoid(), ...contact };
    set_found_contact([
      ...found_contact.msgs,
      found_contact.msgs.push(formMessage),
      found_contact.msgs.push(newMessage),
    ]);

    console.log(formMessage);
    console.log(newMessage);

    // add to friends.json
    contacts.msgs.push(formMessage, newMessage);
    await updateContacts(contacts);
  };

  // const addMM = setTimeout(addMessage, 15000);

  return (
    <div className="App">
      <Profile userAvatar={user.avatar}></Profile>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        findContact={findContact}
        friends={getFilterContacts()}
      ></ContactList>
      {found_contact && (
        <>
          <Chat items={found_contact.msgs}></Chat>
          <ChatForm onSubmit={addMessage}></ChatForm>
        </>
      )}
    </div>
  );
};

export default App;

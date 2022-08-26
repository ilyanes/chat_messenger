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

const App = () => {
  const [filter, setFilter] = useState("");
  const [chatContacts, setChatContacts] = useState(friends);
  const [isShow, setIsShow] = useState({ isShow: false });
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(chatContacts));
  // }, [chatContacts]);

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();

    return chatContacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // const onToggleChat = () => {
  //   setIsShow((prevState) => ({
  //     isShow: !prevState.isShow,
  //   }));
  // };

  const addMessage = async (contact) => {
    const chak = await fetchAnswers();
    const newMessage = {
      id: nanoid(),
      messages: chak,
    };
    setChatContacts([
      ...chatContacts.msgs,
      { id: nanoid(), ...contact },
      newMessage,
    ]);
    console.log(newMessage);
  };

  // const addMessage = async (contact) => {
  //   const chak = await fetchAnswers();
  //   const newMessage = {
  //     id: nanoid(),
  //     messages: chak,
  //   };
  //   setMessages([...messages, { id: nanoid(), ...contact }, newMessage]);
  //   console.log(newMessage);
  // };

  const findContact = (id) => {
    const contacts = chatContacts.findIndex((contact) => contact.id === id);
    console.log("click", contacts);
    setIsShow((prevState) => ({
      isShow: !prevState.isShow,
    }));
    return contacts;
  };

  return (
    <div className="App">
      <Profile userAvatar={user.avatar}></Profile>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList
        onClick={() => findContact()}
        friends={getFilterContacts()}
      ></ContactList>
      {isShow.isShow && (
        <>
          <ChatForm friends={chatContacts} onSubmit={addMessage}></ChatForm>
          <Chat items={chatContacts.msgs}></Chat>
        </>
      )}
      {/* {isShow.isShow && <Chat items={chatContacts.msgs}></Chat>} */}
      {/* <ChatForm onSubmit={addMessage}></ChatForm> */}
    </div>
  );
};

export default App;

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
import { mapper } from "./services/mapper";

const App = () => {
  const [filter, setFilter] = useState("");
  const [chatContacts, setChatContacts] = useState(friends);
  const [messages, setMessages] = useState([]);

  // setTimeout(() => {
  //   newClient.send("Welcome to wsServer!");
  // }, 3000);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(chatContacts));
  }, [chatContacts]);

  // useEffect(() => {
  //   fetchAnswers()
  //     .then((MSG) => {
  //       const mapMessages = mapper(MSG);
  //       console.log(mapMessages);
  //       setMessages((prevState) => [...prevState, ...mapMessages]);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();

    return chatContacts.filter((contact) =>
      // contact.msgs.toLowerCase().includes(normalizedFilter) ||
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addMessage = () => {
    const newMessage = {
      id: nanoid(),
      message: fetchAnswers(),
    };
    setMessages([...messages, newMessage]);
    console.log(newMessage);
  };

  return (
    <div className="App">
      <Profile userAvatar={user.avatar}></Profile>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList friends={getFilterContacts()}></ContactList>
      <Chat items={messages}></Chat>
      <ChatForm onSubmit={addMessage}></ChatForm>
    </div>
  );
};

export default App;

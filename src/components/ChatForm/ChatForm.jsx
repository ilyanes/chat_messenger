import { useState } from "react";

const ChatForm = ({ onSubmit, friends }) => {
  const [state, setState] = useState({
    messages: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      messages: "",
    });
  };

  const { messages } = state;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={messages}
        name="messages"
        onChange={handleChange}
        placeholder="Type your message"
      />
      <button>Send</button>
    </form>
  );
};

export default ChatForm;

// import { useState } from "react";

// const ChatForm = ({ onSubmit }) => {
//   const [state, setState] = useState({
//     messages: "",
//   });

//   const handleChange = ({ target }) => {
//     const { name, value } = target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ ...state });
//     setState({
//       messages: "",
//     });
//   };

//   const { messages } = state;

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={messages}
//         name="messages"
//         onChange={handleChange}
//         placeholder="Type your message"
//       />
//       <button>Send</button>
//     </form>
//   );
// };

// export default ChatForm;

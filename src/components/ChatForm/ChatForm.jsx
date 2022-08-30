import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import style from "./ChatForm.module.scss";

const ChatForm = ({ onSubmit }) => {
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
    <div className={style.formLayout}>
      <form onSubmit={handleSubmit} className={style.formChat}>
        <input
          className={style.formInput}
          value={messages}
          name="messages"
          onChange={handleChange}
          placeholder="Type your message"
        />
        <button className={style.formButton}>
          <MdOutlineSend size={18} color={"grey"} />
        </button>
      </form>
    </div>
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

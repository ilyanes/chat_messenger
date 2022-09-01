import axios from "axios";

axios.defaults.baseURL = "https://api.chucknorris.io/jokes";

const fetchAnswers = async () => {
  const response = await axios.get("/random");
  return response.data.value;
};

export default fetchAnswers;

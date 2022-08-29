import style from "./Filter.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function Filter({ value, onChange }) {
  return (
    <label htmlFor="" className={style.filterLabel}>
      <span>
        <AiOutlineSearch size={16} color={"grey"} />
      </span>
      <input
        className={style.filterInput}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search or start new chat"
      />
    </label>
  );
}

export default Filter;

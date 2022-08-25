function Filter({ value, onChange }) {
  return (
    <label htmlFor="">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search or start new chat"
      />
    </label>
  );
}

export default Filter;

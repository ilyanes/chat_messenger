import style from "./HeaderProfile.module.css";
function HeaderProfile({ children }) {
  return (
    <section>
      <div className={style.headerLayout}>{children}</div>
    </section>
  );
}

export default HeaderProfile;

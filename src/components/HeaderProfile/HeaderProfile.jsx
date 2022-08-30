import style from "./HeaderProfile.module.scss";
function HeaderProfile({ children }) {
  return (
    <section>
      <div className={style.headerLayout}>{children}</div>
    </section>
  );
}

export default HeaderProfile;

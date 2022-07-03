import HeaderItems from "./HeaderItems";
import classes from "./Header.module.css";
const Navigation = (props) => {
  const onClick = props.onClick;
  return (
    <nav className={classes.Navigation}>
      <HeaderItems onClick={(row, col) => onClick(row, col)}></HeaderItems>
    </nav>
  );
};
export default Navigation;

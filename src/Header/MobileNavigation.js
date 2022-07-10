import HeaderItems from "./HeaderItems";
import classes from "./Header.module.css";
import { CgMenuRound } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";
const MobileNavigation = (props) => {
  const [open, setOpen] = useState(false);
  const openIcon = (
    <CgMenuRound
      className={classes.Icon}
      onClick={() => setOpen(!open)}
      size="1rem"
      color="white"
    ></CgMenuRound>
  );
  const closeIcon = (
    <CgCloseO
      className={classes.Icon}
      onClick={() => setOpen(!open)}
      size="1rem"
      color="white"
    ></CgCloseO>
  );
  const closeMobileNav = () => {
    setOpen(false);
  };

  const onClick = props.onClick;
  return (
    <nav className={classes.MobileNavigation}>
      <div className={classes.MobileTitle}>Algorithm Visualizer</div>
      {open ? closeIcon : openIcon}
      {open && (
        <HeaderItems
          onClick={(row, col) => onClick(row, col)}
          isMobile={true}
          closeMobileNav={closeMobileNav}
        ></HeaderItems>
      )}
    </nav>
  );
};
export default MobileNavigation;

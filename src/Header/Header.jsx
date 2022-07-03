import React from "react";
import classes from "./Header.module.css";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
function Header (props) {
   const onClick = props.onClick;
    return (
      <div className={classes.Header}>
        <Navigation onClick={(row,col)=>onClick(row,col)}></Navigation>
        <MobileNavigation onClick={(row,col)=>onClick(row,col)}></MobileNavigation>
      </div>
    );
  }

export default Header;

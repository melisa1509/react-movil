import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// core components
import AdminNavbarLinks from "./LanguageNavbarLinks";
import Button from "components/CustomButtons/Button.jsx";

import adminNavbarStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.jsx";

function AdminNavbar({ ...props }) {
  const { classes, color, rtlActive, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });  
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>        
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {brandText}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>
        
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func
};

export default withStyles(adminNavbarStyle)(AdminNavbar);

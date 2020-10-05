/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { translate } from "react-translate";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { switchCase } from "@babel/types";


function HeaderLinksAdmin({ ...props }) {
  const { classes, rol, t } = props;
  //const rol = 'ROLE_STUDENT';
  let links = '';
  if(rol === 'ROLE_ADMIN'){
    links = [
      <Link to="/" className={classes.dropdownLink}>
        {t("link.users")}
      </Link>,
      <Link to={'/app'} className={classes.dropdownLink}>
        App
      </Link>,
      <Link to={'/course/new'} className={classes.dropdownLink}>
        Course
      </Link>,
      <a
        href="https://creativetimofficial.github.io/material-kit-react/#/documentation"
        className={classes.dropdownLink}
      >
        Documentation
      </a>
    ]
  }
  else if(rol === 'ROLE_STUDENT'){
    links = [
      <Link to="/" className={classes.dropdownLink}>
        {t("link.users")}
      </Link>,
      <Link to={'/app'} className={classes.dropdownLink}>
        App
      </Link>,
      <Link to={'/course/new'} className={classes.dropdownLink}>
        Course
      </Link>,
      <a
        href="https://creativetimofficial.github.io/material-kit-react/#/documentation"
        className={classes.dropdownLink}
      >
        Documentation
      </a>
    ]
  }
  
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText={t("link.administrator")}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          hoverColor="info"
          buttonIcon={Apps}
          dropdownList={ links }
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

export default translate('provider')(withStyles(headerLinksStyle)(HeaderLinksAdmin));

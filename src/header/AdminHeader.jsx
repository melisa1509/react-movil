import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "header/HeaderLinksAdmin.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {

    };
  }


  render() {
    const { classes, rol, ...rest } = this.props;
    return (
        <Header
          absolute
          color="white"
          brand="assets/img/interweavelogo.png"
          rightLinks={<HeaderLinks rol={rol} />}
          {...rest}
        />
    );
  }
}

export default withStyles(loginPageStyle)(AdminHeader);

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";


import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import IndexRep from "./IndexRep.jsx";
import AdminHeader from "views/Header/AdminHeader.jsx";


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {

    };
  }


  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AdminHeader {...rest} rol={'ROLE_ADMIN'}/>
        <div
          className={classes.main}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundColor: "#eee"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <IndexRep handleAddAge = {this.state.handleAddAge } ages={this.state.data} headerTitles={ this.state.headerTitles } generalStyles={styles}/>
              </GridItem>
            </GridContainer>
          </div>
          <Footer blackFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(Index);

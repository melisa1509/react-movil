import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PerfectScrollbarStyle from 'react-perfect-scrollbar/dist/css/styles.css';

// core components
import Footer from "views/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
import ChangePasswordRep from 'views/Profile/ChangePassword/ChangePasswordRep.jsx';
import AdminHeader from "views/Header/AdminHeader.jsx";
import PerfectScrollbar from 'react-perfect-scrollbar';


const styles = {
  ...mainPageStyle,
  ...PerfectScrollbarStyle
};

class ChangePassword extends React.Component {
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
        <AdminHeader {...rest}/>
        <div
          className={classes.main}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundColor: "#ffff"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <ChangePasswordRep generalStyles={styles}/>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ChangePassword);

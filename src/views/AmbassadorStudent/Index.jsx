import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PerfectScrollbarStyle from 'react-perfect-scrollbar/dist/css/styles.css';

// core components
import Footer from "views/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
import IndexRep from "./IndexRep.jsx";
import AdminHeader from "views/Header/AdminHeader.jsx";


const styles = {
  ...mainPageStyle,
  ...PerfectScrollbarStyle
};

class Index extends React.Component {
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AdminHeader/>
        <div
          className={classes.main}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundColor: "#fff"
          }}
        >
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <IndexRep generalStyles={styles}/>
              </GridItem>
            </GridContainer>
          <Footer blackFont />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Index);

import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import ChangePasswordForm from 'views/User/NewPassword/ChangePassword/ChangePasswordForm.jsx';
import Logo from "assets/img/logo_interweave.png";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class ChangePasswordRep extends React.Component {
  
  render() {
    const { classes, styles } = this.props;
    let { t } = this.props;
    return (
      <>
            <br/>
            <GridContainer justify="center">
              <GridItem>
                <img src={Logo} height="100px" alt="..." />
              </GridItem>
            </GridContainer>
            <br/>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_change_password")}</h4>
             </center>
            </CardHeader>
            <CardBody>
                <ChangePasswordForm  />  
            </CardBody>
      </>
    );
  }
}

ChangePasswordRep.propTypes = {
  classes: PropTypes.object,
};


const mapDispatchToPropsActions = dispatch => ({

});


const ChangePasswordRepComponent = translate(withStyles(styles)(ChangePasswordRep));
export default withRouter(connect(null, mapDispatchToPropsActions)(ChangePasswordRepComponent));
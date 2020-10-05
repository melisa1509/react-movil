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
import LoginForm from './LoginForm.jsx';
import Logo from "assets/img/logo_interweave.png";


import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';


const styles = {
  cardHeader: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    padding: "0px"
  }, 
  cardTitle:{
    textAlign: "center"
  },
  cardCategory:{
    textAlign: "center",
    color:     "#ffffff9e"
  }
};


class LoginRep extends React.Component {
  
  render() {
    const { classes, styles } = this.props;
    let { t } = this.props;
    return (
      <>
            
          <GridContainer justify="center">
            <GridItem>
              <img src={Logo} height="90px" alt="..." />            
            </GridItem>
          </GridContainer>
          <br/>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_interweave_academy")}</h4>
                <p className={classes.cardCategory}>{t("title_welcome")}</p>
            </CardHeader>
            <CardBody>
                <LoginForm  />      
            </CardBody>
          <br/><br/><br/><br/><br/>
      </>
    );
  }
}

LoginRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
  
});


const LoginRepComponent = translate(withStyles(styles)(LoginRep));
export default connect(null, mapDispatchToPropsActions)(LoginRepComponent);
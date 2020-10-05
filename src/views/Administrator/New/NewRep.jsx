import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import NewForm from 'views/Administrator/New/NewForm.jsx';

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
class NewRep extends React.Component {
  
  render() {
    const { classes, styles } = this.props;
    let { t } = this.props;
    return (
      <>
            <br/><br/>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_new_admin")}</h4>
             </center>
            </CardHeader>
            <CardBody>
                <NewForm/>  
            </CardBody>
      </>
    );
  }
}

NewRep.propTypes = {
  classes: PropTypes.object,
};


const mapDispatchToPropsActions = dispatch => ({

});


const NewRepComponent = translate(withStyles(styles)(NewRep));
export default withRouter(connect(null, mapDispatchToPropsActions)(NewRepComponent));
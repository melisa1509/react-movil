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
import EditForm from 'views/Student/Edit/EditForm.jsx';

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


class EditRep extends React.Component {
  
  render() {
    const { classes, styles } = this.props;
    let { t } = this.props;
    return (
      <>
            <br/><br/>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_edit_student")}</h4>
             </center>
            </CardHeader>
            <CardBody>
                <EditForm  />  
            </CardBody>
      </>
    );
  }
}

EditRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({

});


const EditRepComponent = translate(withStyles(styles)(EditRep));
export default withRouter(connect(null, mapDispatchToPropsActions)(EditRepComponent));
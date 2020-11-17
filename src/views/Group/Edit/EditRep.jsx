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
import EditForm from 'views/Group/Edit/EditForm.jsx';
import EditAmbassador from 'views/Group/Edit/EditAmbassador.jsx';

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
    const { classes, show_ambassador, active_user} = this.props;
    let { t } = this.props;
    let rol=false
    if(active_user.roles == "ROLE_EMBASSADOR" || active_user.roles == "ROLE_STUDENT_EMBASSADOR"){
      rol=true
    }
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_edit_group")}</h4>
             </center>
            </CardHeader>
            <CardBody>
                {rol ? <EditAmbassador  /> : <EditForm  /> }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

EditRep.propTypes = {
  classes: PropTypes.object,
};


const mapDispatchToPropsActions = dispatch => ({
});

const mapStateToProps = state => ({ 
  show_ambassador: state.groupReducer.show_embassador, 
  active_user: state.loginReducer.active_user, 
});


const EditRepComponent = translate(withStyles(styles)(EditRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(EditRepComponent));
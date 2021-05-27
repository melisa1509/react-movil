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
import ShowForm from 'views/GrantAmbassador/Show/ShowForm.jsx';
import ShowStartupForm from 'views/GrantAmbassador/Show/ShowStartupForm.jsx';

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


class ShowRep extends React.Component {
  
  render() {
    const { classes, show_ambassador, show_grant} = this.props;
    let { t } = this.props;
    
    return (
      <>
            <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
            <center>
            <h4 className={classes.cardTitle}>{show_grant.type === "state.scholarship" ? t("title_grant_application") : t("title_grant_application_startup")}</h4>
             <p>{ show_grant.title }</p>
             </center>
            </CardHeader>
            <CardBody>
                {show_grant.type === "state.scholarship" ? <ShowForm /> : <ShowStartupForm />}
            </CardBody>
          </Card>
      </>
    );
  }
}

ShowRep.propTypes = {
  classes: PropTypes.object,
};


const mapDispatchToPropsActions = dispatch => ({
});

const mapStateToProps = state => ({ 
  show_ambassador: state.grantReducer.show_embassador, 
  active_user: state.loginReducer.active_user, 
  show_grant: state.grantReducer.show_grant
});


const ShowRepComponent = translate(withStyles(styles)(ShowRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowRepComponent));
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
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_edit_grant")}</h4>
             <p>{ show_grant.title }</p>
             </center>
            </CardHeader>
            <CardBody>
                <ShowForm  />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
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
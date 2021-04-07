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
import IndexTableUpdates from "./IndexTableUpdates.jsx";

import { showGrant } from "actions/grantActions.jsx";
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


class IndexRep extends React.Component {

  componentWillMount() {
    this.props.dispatchShowGrant(this.props.match.params.id);
  }
 

  render() {
    const { classes, show_grant } = this.props;
    let { t } = this.props;    
    return (
      <div>
          <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>{t("title_approved_grant_applications")}</h4>
                <p>{ show_grant.title + " / " + t(show_grant.language)}</p>
            </CardHeader>
            <CardBody>
              <IndexTableUpdates  />
            </CardBody>
          </Card>
      </div>
    );
  }
}

IndexRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGrant: key => dispatch(showGrant(key)),
});
const mapStateToProps = state => ({ 
  active_user: state.loginReducer.active_user, 
  show_grant: state.grantReducer.show_grant
});

const NewRepComponent = translate(withStyles(styles)(IndexRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent));
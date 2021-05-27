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
import NewForm from 'views/GrantAmbassador/New/NewForm.jsx';
import NewStartupForm from 'views/GrantAmbassador/New/NewStartupForm.jsx';

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';
import { showGrant} from 'actions/grantActions.jsx';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};
class NewRep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {       
    };
  }

  componentDidMount() {
    this.props.dispatchShowGrant(this.props.match.params.id);
  }

  
  render() {
    const { classes, show_grant } = this.props;
    let { t } = this.props;
    
    return (
      <>
            <br/><br/><br/><br/>
          <Card>
          <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{show_grant.type === "state.scholarship" ? t("title_grant_application") : t("title_grant_application_startup")}</h4>
             <p>{show_grant.title}</p>
             </center>
            </CardHeader>
            <CardBody>
              {show_grant.type === "state.scholarship" ? <NewForm /> : <NewStartupForm />}
            </CardBody>
          </Card>
      </>
    );
  }
}

NewRep.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  show_grant: state.grantReducer.show_grant
});


const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGrant: key => dispatch(showGrant(key)),
});


const NewRepComponent = translate(withStyles(styles)(NewRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent));
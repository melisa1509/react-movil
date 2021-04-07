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
import NewForm from 'views/Grant/New/NewForm.jsx';

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
  constructor(props) {
    super(props);
    this.state = {       
    };
  }

  
  render() {
    const { classes } = this.props;
    let { t } = this.props;
    const initialValuesGrant= {
      date:moment().format('YYYY-MMM-DD'),
      id_ambassador:this.props.match.params.id,
    }
    return (
      <>
            <br/><br/><br/><br/>
          <Card>
            <CardHeader color="info">
            <center>
             <h4 className={classes.cardTitle}>{t("title_new_grant")}</h4>
             </center>
            </CardHeader>
            <CardBody>
                <NewForm initialValues={initialValuesGrant} />
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
});


const mapDispatchToPropsActions = dispatch => ({
});


const NewRepComponent = translate(withStyles(styles)(NewRep));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewRepComponent));
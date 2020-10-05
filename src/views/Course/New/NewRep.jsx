import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import NewForm from 'views/Course/New/NewForm.jsx';

import { getData } from "actions/actions.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { translate } from "react-translate";
import { withRouter } from 'react-router-dom';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  } 
};


class NewRep extends React.Component {
  

  handleUpdateClick = () => {
   
    this.props.dispatchSetData();
    
  }

  handleUpdateClickSuccess = () => {
    this.props.dispatchSetData();
  }

  componentDidMount() {
    // calling the new action creator
    this.props.dispatchSetData();
  }


  render() {
    const { classes, styles } = this.props;
    let { t } = this.props;
    const login = "es";
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
             <h4 className={classes.cardTitle}>{t("title.new_course")}</h4>
            </CardHeader>
            <CardBody>
                <NewForm  />      
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

NewRep.propTypes = {
  classes: PropTypes.object,
};

//export default withStyles(styles)(ReactTables);

const mapDispatchToPropsActions = dispatch => ({
  dispatchSetData: () => dispatch( getData() )
});


const NewRepComponent = translate('provider')(withStyles(styles)(NewRep));
export default withRouter(connect(null, mapDispatchToPropsActions)(NewRepComponent));
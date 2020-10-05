import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { editProgrammbs, saveProject, activeTab } from "actions/programmbsActions.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  },
  cardCategory:{
    textAlign: "center"
  },
  verticalSpace:{
    paddingBottom: "30px"
  },
  ...sweetAlertStyle
};


class ControlNavigation extends React.Component {

 

  render() {
    const { dashboard_student, previous, next } = this.props;
    let { t } = this.props;
    return (
        <GridContainer justify="center">
            
      </GridContainer>
    );
  } 
}

ControlNavigation.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  dashboard_student: state.studentReducer.dashboard_student
});

const mapDispatchToPropsActions = dispatch => ({  
});


const ConstrolsComponent = translate(withStyles(styles)(ControlNavigation));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ConstrolsComponent));
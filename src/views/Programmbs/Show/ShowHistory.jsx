import React from "react";
import PropTypes from "prop-types";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

// core components
import { translate } from 'react-switch-lang';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import AdminHeader from "views/Header/AdminHeader.jsx";
import ShowRep from "./ShowRep.jsx";
import Popups from "./Popups.jsx";
import mainPageStyle from "assets/jss/material-kit-react/views/mainPage.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { hideRevisionAlert, redirectDashboard } from "actions/programmbsActions.jsx";
import { GroundOverlay } from "react-google-maps";

const styles = {
    ...mainPageStyle,
    ...sweetAlertStyle
  };


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }
  
  hideAlert() {
    this.props.dispatchHideRevisionAlert();
  }
  redirectDashboard(){
    this.props.dispatchRedirectDashboard(this.props.history);
  }
  render() {
    const { classes, sendRevisionProjectSuccessfull, sendRevisionProjectError, editRevisionSuccessfull, editRevisionError, approveProjectError, approveProjectSuccessfull, t } = this.props;
    return (
        <div>
          <Popups/>    
        <div
          className={classes.main}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundColor: "#eee"
          }}
        >
          <div className={classes.containerHeader} >
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <ShowRep active={8} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    
    );
  }
}

Show.propTypes = {
  classes: PropTypes.object
};


const mapStateToProps = state => ({ 
  editRevisionError: state.programmbsReducer.editRevisionError,
  editRevisionSuccessfull: state.programmbsReducer.editRevisionSuccessfull,
  approveProjectError: state.programmbsReducer.approveProjectError,
  approveProjectSuccessfull: state.programmbsReducer.approveProjectSuccessfull,
  sendRevisionProjectError: state.programmbsReducer.sendRevisionProjectError,
  sendRevisionProjectSuccessfull: state.programmbsReducer.sendRevisionProjectSuccessfull
    
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchHideRevisionAlert: () => dispatch( hideRevisionAlert() ),
  dispatchRedirectDashboard: param => dispatch( redirectDashboard(param) )
});

const ShowComponent = translate(withStyles(styles)(Show));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowComponent));

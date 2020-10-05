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

import { hideRevisionAlert, redirectDashboard } from "actions/programsaActions.jsx";
import { getShowProgramsa } from "actions/programsaActions.jsx";

const styles = {
    ...mainPageStyle,
    ...sweetAlertStyle
  };


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }
  
  
  componentWillMount() {
    this.props.dispatchShowProgramsa(this.props.match.params.id);
  }
  render() {
    const { classes } = this.props;
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
                <ShowRep active={0}/>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.object
};


const mapStateToProps = state => ({  
    
});

const mapDispatchToPropsActions = dispatch => ({ 
  dispatchShowProgramsa: key => dispatch(getShowProgramsa(key)),
});

const EditComponent = translate(withStyles(styles)(Edit));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(EditComponent));

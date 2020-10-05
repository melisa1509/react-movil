import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { editRevisionProgramsa, approveProject, sendRevisionProject } from "actions/programsaActions.jsx";
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


class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleSaveRevision = this.handleSaveRevision.bind(this);
    this.handleApproveProject = this.handleApproveProject.bind(this);
    this.handleSendRevisionProject = this.handleSendRevisionProject.bind(this);
  }

  handleSaveRevision(){
    this.props.dispatchEditRevisionProgramsa(this.props.history);
  }

  handleApproveProject(){
    this.props.dispatchApproveProject(this.props.history);
  }

  handleSendRevisionProject(){
    this.props.dispatchSendRevisionProject(this.props.history);
  }
 

  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
            <GridContainer justify="center">
                <Button color="warning" size="sm" onClick={this.loginClick}>
                    {t("button_approve_this_section")}
                </Button>
            </GridContainer>
            <GridContainer justify="center" className={ classes.verticalSpace }>
                <Button color="info" size="sm" onClick={this.handleSaveRevision}>
                    {t("button_save_revision")}
                </Button>
                {" "}
                <Button color="danger" size="sm" onClick={this.handleSendRevisionProject}>
                    {t("button_send_correction")}
                </Button>
                <Button color="defaul" size="sm" onClick={this.loginClick}>
                    {t("button_certificate_attendance")}
                </Button>
                {" "}
                <Button color="success" size="sm" onClick={this.handleApproveProject}>
                    {t("button_approved")}
                </Button>
                
            </GridContainer>
        </GridItem>
      </GridContainer>
    );
  } 
}

Controls.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchEditRevisionProgramsa: param => dispatch( editRevisionProgramsa(param) ), 
  dispatchApproveProject: param => dispatch( approveProject(param)),
  dispatchSendRevisionProject: param => dispatch( sendRevisionProject(param))
});


const ConstrolsComponent = translate(withStyles(styles)(Controls));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ConstrolsComponent));
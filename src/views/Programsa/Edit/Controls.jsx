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
import { editProgramsa, saveProject } from "actions/programsaActions.jsx";
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
    this.handleSave = this.handleSave.bind(this);    
    this.handleSaveProject = this.handleSaveProject.bind(this);
  }

  handleSave(){
    this.props.dispatchEditProgramsa(this.props.history);
  }  

  handleSaveProject(){
    this.props.dispatchSaveProject(this.props.history);
  }
 

  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>            
            <GridContainer justify="center" className={ classes.verticalSpace }>
                <Button color="info" size="sm" onClick={this.handleSave}>
                    {t("button_save")}
                </Button>                
                {" "}
                <Button color="success" size="sm" onClick={this.handleSaveProject}>
                    {t("button_send_revision")}
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
  dispatchEditProgramsa: param => dispatch( editProgramsa(param) ),   
  dispatchSaveProject: param => dispatch( saveProject(param)),
});


const ConstrolsComponent = translate(withStyles(styles)(Controls));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ConstrolsComponent));
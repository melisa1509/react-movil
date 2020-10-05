import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { store } from "store";
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { newGroup } from "actions/groupActions.jsx"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { successfulNew } from "actions/generalActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import FileUpload from "components/CustomUpload/FileUpload.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { withRouter } from 'react-router-dom';

const style = {
    infoText: {
      fontWeight: "500",
      textAlign: "left"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px"
    },
    label:{
      color:"red",
      fontSize:"30px"
    },
    ...customSelectStyle,
    ...validationFormsStyle
};


class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupnameState: "success",
            interweaveLocalState: "success",
            authorizationCodeState: "success",
            uploadPercentage: 0,
        };
        this.saveClick = this.saveClick.bind(this);
    }

    updateFileName = (key) => {
      this.props.change('name_image', key);
    }
  
    saveClick() {

    }

    render() {
        const { classes, errorRequired, successRequired } = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <form>          
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <Field
                      component={FileUpload}
                      name="name_image"
                      changeFileName = {this.updateFileName}
                      inputProps={{
                        type: "file",
                      }}
                    />            
                  </GridItem>
              </GridContainer>   
              </form>
            </GridItem>
          </GridContainer>
                
        );
    }
}

UploadForm = reduxForm({
  form: 'uploadform', 
})(UploadForm);


UploadForm = connect(
  state => ({
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    successfull_new:state.generalReducer.successfull_new,
    new_group: state.groupReducer.new_group,
  }),
  { dispatchNewGroup: newGroup, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful, dispatchSuccessfulNew: successfulNew },
)(UploadForm);

export default  withRouter(translate(withStyles(style)(UploadForm)));




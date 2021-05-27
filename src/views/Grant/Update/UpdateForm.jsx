import React from "react";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";
import SuccessBold from "components/Typography/SuccessBold.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import FileUpload from "components/CustomUpload/FileUpload.jsx";

import { translate } from 'react-switch-lang';
import { newGrantUpdate, showGrant, showGrantUpdate } from "actions/grantActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";

// style for this view
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

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
  ...validationFormsStyle,
  ...sweetAlertStyle
};


class UpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
    this.saveClick = this.saveClick.bind(this);
    this.deleteClick= this.deleteClick.bind(this);
  }

  saveClick() {
    this.props.dispatchNewGrantUpdate(this.props.match.params.id);
  }    

  deleteClick(){
    this.props.dispatchDeleteSuccessful();
    this.props.dispatchShowGrantUpdate(this.props.match.params.id);
  }

  updateFileName = (key) => {
    this.props.change('file', key);
  }

  render() {
    const { t, active_user, classes, successfull_new } = this.props;
    let label = "label_grant_corrections";
    if(active_user.roles.includes("ROLE_LANGUAGE_ADMIN") || active_user.roles.includes("ROLE_ADMIN")){
      label = "label_grant_corrections";
    }
    else{
      label = "label_grant_updates";
    }
    return (
      <GridContainer justify="center">
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
                { successfull_new ?      
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px", close:true }}
                    onConfirm={() => this.deleteClick()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                    confirmBtnText={t("button_continue")}
                    >
                    <h4>{t("label_save_success")}</h4>
                  </SweetAlert> 
                : ""}
            </GridItem>
        </GridContainer>
        <GridItem xs={12} sm={12} md={9}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <form>
                  <SuccessBold>
                    {t(label)}
                  </SuccessBold>
                  <Field
                    component={CustomInputRedux}
                    name="description"
                    success
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 12,
                    }}
                  />                
                  <br/>
                  <InputLabel className={classes.label}>
                      <SuccessBold className={classes.label}>{t("label_grant_file2")}</SuccessBold>
                  </InputLabel>                
                  <Field
                    component={FileUpload}
                    name="file"
                    changeFileName = {this.updateFileName}
                    inputProps={{
                      type: "file",
                    }}
                  />  
              </form> 
            </GridItem>
          </GridContainer>
              <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <center>
                          <Button color="info" size="sm" onClick={this.saveClick}>
                            {t("button_save")}
                          </Button>
                        </center>
                    </GridItem>
              </GridContainer>
        </GridItem>
      </GridContainer>        
          
    );
  }
}

UpdateForm = reduxForm({
  form: 'grantUpdateForm',
  enableReinitialize: true,
})(UpdateForm);


UpdateForm = connect(
  state => ({
    successfull_new:state.generalReducer.successfull_new,
    active_user:state.loginReducer.active_user
  }),
  { dispatchDeleteSuccessful: deleteSuccessful, dispatchNewGrantUpdate: newGrantUpdate, dispatchShowGrant: showGrant, dispatchShowGrantUpdate: showGrantUpdate }, 
)(UpdateForm);


export default withRouter(translate(withStyles(style)(UpdateForm)));
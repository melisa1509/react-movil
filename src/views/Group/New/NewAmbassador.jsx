import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { store } from "store";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";
import Accordion from "components/Accordion/Accordion.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx'; 
import DateTimePicker from 'components/DateTimePicker/DateTimePickerRedux.jsx';
import { newGroup } from "actions/groupActions.jsx"; 
import { errorRequiredFields } from "actions/generalActions.jsx";
import { successRequiredFields } from "actions/generalActions.jsx";
import { showGroupRedirect  } from "actions/groupActions.jsx";
import { verifyChange } from "assets/validation/index.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import ModalitySelect from "views/Select/ModalitySelect.jsx";
import ProgramAmbassadorSelect from "views/Select/ProgramAmbassadorSelect.jsx";
import FileUpload from "components/CustomUpload/FileUpload.jsx";
import CustomRadioRedux from 'components/CustomRadio/CustomRadioRedux.jsx';

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


class NewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupnameState: "success",
            interweaveLocalState: "success",
            authorizationCodeState: "success",
            uploadPercentage: 0,
        };
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick= this.deleteClick.bind(this);
    }

    updateFileName = (key) => {
      this.props.change('name_image', key);
    }

    
     
    saveClick() {
        if (this.state.groupnameState === "") {
        this.setState({ groupnameState: "error" });
        }
        if (this.state.interweaveLocalState === "") {
          this.setState({ imterweaveLocalState: "error" });
        }
        if (this.state.authorizationCodeState === "") {
          this.setState({ authorizationCodeState: "error" });
        }
        if(this.state.groupnameState === "error" || this.state.full_nameState === "error"){
          const stateRedux = store.getState();
          this.props.dispatchErrorRequiredFields();
        }
        if(this.state.groupnameState === "success" ){
        const reduxState = store.getState();
        this.props.dispatchNewGroup();
        this.props.dispatchSuccessRequiredFields();
        }
      }

    deleteClick(){
      this.props.dispatchShowGroupRedirect(this.props.history)
      this.props.dispatchDeleteSuccessful();
    }
      
    render() {
        const { classes, errorRequired, successRequired, successfull_new } = this.props;
        let { t } = this.props;
        const custom_certificate_options = {         
          options:[
            { label: t("label_custom_certificate_option1"),      val: "1" },
            { label: t("label_custom_certificate_option2"),      val: "2"  },
            { label: t("label_custom_certificate_option3"),      val: "3"  },
            { label: t("label_custom_certificate_option4"),      val: "4"  },
          ]
        }
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <form>
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
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                    <Field
                      labelText={t("label_name")+ " *"}
                      component={CustomInputRedux}
                      name="name"
                      success={this.state.groupnameState === "success"}
                      error={this.state.groupnameState === "error"}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onKeyUp: event => 
                              verifyChange(event, "groupname", "length", 0, null, this),
                        type: "text",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label}>
                    <SuccessLabel>{t("label_start_classes")}</SuccessLabel>
                  </InputLabel>
                    <Field
                      component={DateTimePicker}
                      name="start_date"
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label}>
                    <SuccessLabel>{t("label_final_clases")}</SuccessLabel>
                  </InputLabel>
                    <Field
                      component={DateTimePicker}
                      name="final_date"
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label}>
                    <SuccessLabel>{t("label_graduation_date")}</SuccessLabel>
                  </InputLabel>
                    <Field
                      component={DateTimePicker}
                      name="graduation_date"
                    />
                </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={8}>
                    <Field
                      name="modality"
                      formName="programmbs"
                      component={ModalitySelect}
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={8}>
                    <Field
                      name="program"
                      formName="programmbs"
                      component={ProgramAmbassadorSelect}
                    />
                  </GridItem>
              </GridContainer>
              <br/>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <Accordion
                        active={-1}
                        collapses={[
                          {
                            title: t("label_custom_certificate_options"),
                            content:
                                  <GridContainer >
                                      <GridItem xs={12} sm={12} md={9}>
                                        <Field
                                          labelText={t("label_interweave_local")}
                                          component={CustomInputRedux}
                                          name="interweave_local"
                                          success={this.state.interweaveLocalState === "success"}
                                          error={this.state.interweaveLocalState === "error"}
                                          formControlProps={{
                                            fullWidth: true
                                          }}
                                          inputProps={{
                                            onKeyUp: event => 
                                                  verifyChange(event, "interweave_local", "length", 0, null, this),
                                            type: "text",
                                          }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={9}>
                                      <Field
                                        labelText={t("label_authorization_code")}
                                        component={CustomInputRedux}
                                        name="authorization_code"
                                        success={this.state.authorizationCodeState === "success"}
                                        error={this.state.authorizationCodeState === "error"}
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        inputProps={{
                                          onKeyUp: event => 
                                                verifyChange(event, "authorizationCode", "length", 0, null, this),
                                          type: "text",
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}> 
                                      <InputLabel className={classes.label}>
                                        <SuccessLabel>{t("label_name_image")}</SuccessLabel>
                                      </InputLabel>
                                      <Field
                                        component={FileUpload}
                                        name="name_image"
                                        changeFileName = {this.updateFileName}
                                        inputProps={{
                                          type: "file",
                                        }}
                                      />            
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                      <Field
                                        component={CustomRadioRedux}
                                        name="number_students_graduated"
                                        data={custom_certificate_options}
                                      />
                                    </GridItem>
                                  </GridContainer>
                          }
                        ]}
                    />
                  </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <Field
                      component={CustomInputRedux}
                      name="id_ambassador"
                      inputProps={{
                        type: "hidden",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { errorRequired ? <Danger><h6 className={classes.infoText}>{t("label_require_fields")}</h6></Danger>: ""}
                      { successRequired ? "" :  ""}
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.center}>
                      <Link to={"/group"}>
                      <Button color="default" size="sm" onClick={this.deleteClick}>
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Button color="info" size="sm" onClick={this.saveClick.bind(this)}>
                      {t("button_save")}
                      </Button>
                      {" "}
                    </div>
                  </GridItem>
              </GridContainer>
              
              </form>
            </GridItem>
          </GridContainer>
                
        );
    }
}
NewForm.propTypes = {
  classes: PropTypes.object
};

NewForm = reduxForm({
  form: 'groupNewform', 
})(NewForm);


NewForm = connect(
  state => ({
    errorRequired:state.generalReducer.errorRequired,
    successRequired:state.generalReducer.successRequired,
    successfull_new:state.generalReducer.successfull_new,
    new_group: state.groupReducer.new_group,
  }),
  { dispatchNewGroup: newGroup, dispatchErrorRequiredFields: errorRequiredFields, dispatchSuccessRequiredFields: successRequiredFields, dispatchDeleteSuccessful: deleteSuccessful, dispatchShowGroupRedirect: showGroupRedirect },
)(NewForm);

export default  withRouter(translate(withStyles(style)(NewForm)));




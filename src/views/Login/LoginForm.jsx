import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';

// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Danger from "components/Typography/Danger.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { verifyChange } from "assets/validation/index.jsx";
import { getAuthenticacion } from "actions/loginActions";

const style = {
    infoText: {
      fontWeight: "500",
      textAlign: "center"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px"
    },
    ...customSelectStyle,
    ...validationFormsStyle
};


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // register form
            registerEmail: "",
            registerEmailState: "",
            registerPassword: "",
            registerPasswordState: "",
            registerConfirmPassword: "",
            registerConfirmPasswordState: "",
            registerCheckbox: false,
            registerCheckboxState: "",
            // login form
            loginEmail: "",
            loginEmailState: "",
            loginPassword: "",
            loginPasswordState: "",
            loginUsername: "",
            loginUsernameState: "",   
            // type validation
            required: "",
            requiredState: "",
            typeEmail: "",
            typeEmailState: "",
            number: "",
            numberState: "",
            url: "",
            urlState: "",
            equalTo: "",
            whichEqualTo: "",
            equalToState: "",
            // range validation
            minLength: "",
            minLengthState: "",
            maxLength: "",
            maxLengthState: "",
            range: "",
            rangeState: "",
            minValue: "",
            minValueState: "",
            maxValue: "",
            maxValueState: "",
            // Select
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false
        };
        this.registerClick = this.registerClick.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.typeClick = this.typeClick.bind(this);
        this.rangeClick = this.rangeClick.bind(this);
      }
     
      registerClick() {
        if (this.state.registerEmailState === "") {
          this.setState({ registerEmailState: "error" });
        }
        if (this.state.registerPasswordState === "") {
          this.setState({ registerPasswordState: "error" });
        }
        if (this.state.registerConfirmPasswordState === "") {
          this.setState({ registerConfirmPasswordState: "error" });
        }
        if (this.state.registerCheckboxState === "") {
          this.setState({ registerCheckboxState: "error" });
        }
      }
      loginClick() {
        if (this.state.loginUsernameState === "") {
          this.setState({ loginUsernameState: "error" });
        }
        if (this.state.loginPasswordState === "") {
          this.setState({ loginPasswordState: "error" });
        }
        if(this.state.loginUsernameState === "success" && this.state.loginPasswordState === "success"){
          const params = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
          }
          this.props.dispatchGetAuthenticacion(params, this.props.history);
          
        }
        
      }
      typeClick() {
        if (this.state.requiredState === "") {
          this.setState({ requiredState: "error" });
        }
        if (this.state.typeEmailState === "") {
          this.setState({ typeEmailState: "error" });
        }
        if (this.state.numberState === "") {
          this.setState({ numberState: "error" });
        }
        if (this.state.urlState === "") {
          this.setState({ urlState: "error" });
        }
        if (this.state.equalToState === "") {
          this.setState({ equalToState: "error" });
        }
      }
      rangeClick() {
        if (this.state.minLengthState === "") {
          this.setState({ minLengthState: "error" });
        }
        if (this.state.maxLengthState === "") {
          this.setState({ maxLengthState: "error" });
        }
        if (this.state.rangeState === "") {
          this.setState({ rangeState: "error" });
        }
        if (this.state.minValueState === "") {
          this.setState({ minValueState: "error" });
        }
        if (this.state.maxValueState === "") {
          this.setState({ maxValueState: "error" });
        }
      }
    sendState() {
        return this.state;
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    isValidated() {
        return true;
    }
    

    render() {
        const { classes, styles, loginError } = this.props;
        let { t } = this.props;
        const login = "es";
        
        
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={11}>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                          success={this.state.loginUsernameState === "success"}
                          error={this.state.loginUsernameState === "error"}
                          labelText={t("label_username")}
                          id="loginUsername"
                          formControlProps={{
                              fullWidth: true
                          }}
                          inputProps={{
                              onChange: event => 
                              verifyChange(event, "loginUsername", "length", 0, null, this),
                              type: "text",
                              value: this.state.loginUsername,
                          }}
                      />
                      
                  </GridItem>
              </GridContainer>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={12}>
                      
                      <CustomInput
                          success={this.state.loginPasswordState === "success"}
                          error={this.state.loginPasswordState === "error"}
                          labelText={t("label_password")}
                          id="loginpassword"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: event =>
                              verifyChange(event, "loginPassword", "password", null, null, this),
                            type: "password",
                            autoComplete: "off",
                            value: this.state.loginPassword
                          }}
                      />
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      <Button color="danger" fullWidth  onClick={this.loginClick}>
                          {t("button_login")}
                      </Button>
                  </GridItem>
              </GridContainer>
                  <div className={classes.justifyContentCenter}>
                    <a href="/password">
                        <center>{t("label_forgot_password")}</center>
                    </a>
                  </div>
                  
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { loginError ? <Danger><h6 className={classes.infoText}>Invalid Credentials</h6></Danger>: ""}
                  </GridItem>
              </GridContainer>
            </GridItem>           
          </GridContainer>
                
        );
    }
}

const mapStateToProps = state => (
    { 
      loginUsername: state.loginReducer.loginUsername,
      loginPassword: state.loginReducer.loginPassword, 
      loginError: state.loginReducer.loginError      
    }
);

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetAuthenticacion: (params, history) => dispatch( getAuthenticacion(params, history) )
    
});

const LoginFormComponent = translate(withStyles(style)(LoginForm));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(LoginFormComponent));




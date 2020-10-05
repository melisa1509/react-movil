/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// material ui icons

import Check from "@material-ui/icons/Check";


// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

class CustomCheckboxRedux extends React.Component {
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
      maxValueState: ""
    };
    this.registerClick = this.registerClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.typeClick = this.typeClick.bind(this);
    this.rangeClick = this.rangeClick.bind(this);
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  // verifies if value is a valid URL
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
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
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "error" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "error" });
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
  render() {
    const { classes, input, label } = this.props;
    return (
     
      <div
      className={
          classes.checkboxAndRadio +
          " " +
          classes.checkboxAndRadioHorizontal
      }
      >
      <FormControlLabel
          control={
          <Checkbox
              checked={input.value}
              checkedIcon={
              <Check className={classes.checkedIcon} />
              }
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
              checked: classes.checked,
              root: classes.checkRoot
              }}
              onChange={input.onChange}
          />
          }
          classes={{ 
          label: classes.label,
          root: classes.labelRoot
          }}
          label={label}
      />
      </div>
    );
  }
}

CustomCheckboxRedux.propTypes = {
  classes: PropTypes.object
};

export default withStyles(validationFormsStyle)(CustomCheckboxRedux);

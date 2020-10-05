import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-translate";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { newCourse } from "actions/courseActions.jsx";
import { store } from "store";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import LanguageSelect from "views/Select/LanguageSelect.jsx";
import StateSelect from "views/Select/StateSelect.jsx";
// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { verifyChange } from "assets/validation/index.jsx";
import { createBrowserHistory } from "history";
import { withRouter } from 'react-router-dom';


const history = createBrowserHistory();

const style = {
    infoText: {
      fontWeight: "300",
      margin: "10px 0 30px",
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




class NewForm extends React.Component {
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
            name: "",
            nameState: "",
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

            courseName:"",
            courseNameState:"",
            courseDescription:"",
            courseDescriptionState:"",

            // Select
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false
        };
        this.registerClick = this.registerClick.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
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
        if (this.state.loginEmailState === "") {
          this.setState({ loginEmailState: "error" });
        }
        if (this.state.loginPasswordState === "") {
          this.setState({ loginPasswordState: "error" });
        }
        if (this.state.nameState === "") {
          this.setState({ nameState: "error" });
        }
      }
      saveClick() {
        if (this.state.courseNameState === "") {
          this.setState({ courseNameState: "error" });
        }
        if (this.state.courseDescriptionState === "") {
          this.setState({ courseDescriptionState: "error" });
        }
        if(this.state.courseNameState === "success" && this.state.courseDescriptionState === "success"){
          const params = {
            courseName: this.state.courseName,
            courseDescription: this.state.courseDescription,
            courseLanguage: "En",
            courseState: "state.draft",
            redirect: this.props.history,
          }
          const stateRedux = store.getState();
        this.props.dispatchNewCourse(params);
        //this.props.history.push("/age");
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

    componentWillUnmount() {
      localStorage.setItem('someSavedState', JSON.stringify(this.state))
    }

    componentWillMount() {
      const rehydrate = JSON.parse(localStorage.getItem('someSavedState'))
      this.setState(rehydrate)
    }


    render() {
        const { classes, styles } = this.props;
        let { t } = this.props;
        const login = "es";
        
        
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <GridContainer >
                  <GridItem xs={12} sm={12} md={9}>
                      <CustomInput
                          success={this.state.courseNameState === "success"}
                          error={this.state.courseNameState === "error"}
                          labelText={t("label.name")+ " *"}
                          id="courseName"
                          formControlProps={{
                              fullWidth: true
                          }}
                          inputProps={{
                              onChange: event =>
                              verifyChange(event, "courseName", "length", 0, null, this),
                              type: "text",
                          }}
                      />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        success={this.state.courseDescriptionState === "success"}
                        error={this.state.courseDescriptionState === "error"}
                        labelText={t("label.description")+ " *"}
                        id="courseDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                              verifyChange(event, "courseDescription", "length", 0, null, this),
                          multiline: true,
                          rows: 5
                        }}
                      />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                      <LanguageSelect />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                      <StateSelect />
                  </GridItem>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                      <div className={classes.formCategory}>
                          <small>*</small> {t("label.require_fields")}
                      </div>
                  </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={8}>
                      <Button color="default" size="sm" onClick={this.loginClick}>
                          Return to list
                      </Button>
                      {" "}
                      <Button color="success" size="sm" onClick={this.saveClick}>
                          Save
                      </Button>
                  </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
                
        );
    }
}

const mapStateToProps = state => ({ 
      
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchNewCourse: params => dispatch(newCourse(params)), 
});

const NewFormComponent = translate('provider')(withStyles(style)(NewForm));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(NewFormComponent));




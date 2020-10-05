import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx'; 
import CustomRadioRedux from 'components/CustomRadio/CustomRadioRedux.jsx';
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// style for this view
import SnackbarContent from "components/Snackbar/SnackbarContent";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import { evaluationPre } from "actions/registerActions.jsx";
import { withRouter } from 'react-router-dom';

const style = {
    scroll: {
      overflowY: "auto",
      overflowX: "hidden",
      display: "block",
      width: "450px",
      height: "400px",
      scrollBehavior: "smooth",
      alignItems: "left",
      justifyContent: "left",
      textAlign: "left"
    },
    infoText: {
      fontWeight: "500",
      textAlign: "center"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "left",
      cursor: "pointer",
      marginTop: "20px"
    },
    label:{
      fontWeight: "500",
      color:"success",
    },
    ...validationFormsStyle
};


class PreForm extends React.Component {
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

    saveClick(){
      this.props.dispatchEvaluationPre(this.props.history);
    }  
    
    render() {
        const { classes, successfull_edit, group } = this.props;
        let { t } = this.props;  
        const radios = {         
          options:[
            { label: t("label_evaluation_question2_option1"),     val: "option1"  },
            { label: t("label_evaluation_question2_option2"),     val: "option2"  },
            { label: t("label_evaluation_question2_option3"),     val: "option3"  },
            { label: t("label_evaluation_question2_option4"),     val: "option4"  },
          ]
        }
        const option = {         
          options:[
            { label: t("label_evaluation_question1_option1"),     val: "option1"  },
            { label: t("label_evaluation_question1_option2"),     val: "option2"  },
          ]
        }
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <div>       
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                       {group.program === "option.program4" ? t("question_jr_evaluation_question1") : t("question_evaluation_question1")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question1"
                      data={option}
                    />          
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                    {group.program === "option.program4" ? t("question_jr_evaluation_question2") : t("question_evaluation_question2")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question2"
                      data={radios}
                    />          
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                    {group.program === "option.program4" ? t("question_jr_evaluation_question3") : t("question_evaluation_question3")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question3"
                      data={radios}
                    />          
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                    {group.program === "option.program4" ? t("question_jr_evaluation_question4") : t("question_evaluation_question4")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question4"
                      data={radios}
                    />          
                  </GridItem> 
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                    {group.program === "option.program4" ? t("question_jr_evaluation_question5") : t("question_evaluation_question5")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question5"
                      data={radios}
                    />          
                  </GridItem> 
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                    {group.program === "option.program4" ? t("question_jr_evaluation_question6") : t("question_evaluation_question6")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question6"
                      data={radios}
                    />          
                  </GridItem> 
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}> 
                    <InputLabel className={classes.label}>
                    {group.program === "option.program4" ? t("question_jr_evaluation_question7") : t("question_evaluation_question7")}
                    </InputLabel>
                    <Field
                      component={CustomRadioRedux}
                      name="question7"
                      data={radios}
                    />          
                  </GridItem> 
                </GridContainer>
                <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <Field
                      component={CustomInputRedux}
                      name="id_student"
                      inputProps={{
                        type: "hidden",
                      }}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { successfull_edit ?      
                      <SnackbarContent
                        message={
                          <center>{t("label_save_success")}</center>
                        }
                        close
                        color="success"
                      />
                      : ""}
                  </GridItem>
              </GridContainer>
              </div>
            </GridItem>
            <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Button color="info" size="sm" onClick={this.saveClick}>
                      {t("button_send")}
                      </Button>
                      {" "}
                      </center>
                  </GridItem>
              </GridContainer>
          </GridContainer>
        );
    }
}

PreForm = reduxForm({
  form: 'preform', 
})(PreForm);


PreForm = connect(
  state => ({
    evaluation_pre: state.registerReducer.evaluation_pre,
    successfull_edit:state.generalReducer.successfull_edit,
    group:state.groupReducer.show_group
  }),
  {dispatchEvaluationPre: evaluationPre },
)(PreForm);

export default  withRouter(translate(withStyles(style)(PreForm)));




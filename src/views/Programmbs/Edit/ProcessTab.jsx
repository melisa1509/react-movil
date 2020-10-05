import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Primary from "components/Typography/Primary.jsx";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import { loadFormProgrammbs } from "actions/programmbsActions.jsx";

import { translate } from 'react-switch-lang';
import CustomTextarea from "components/CustomInput/CustomTextarea.jsx";


const styles = {
    cardTitleCenter:{
        textAlign: "center"
      },
    textareaProcess:{
        border: "0px",
        resize: "auto",
        height: "auto !important",
        lineHeight: "1.42857 !important",
        overflow: "auto",
        margin: "0",
        fontFamily: "inherit",
    }, 
};


class ProcessTab extends React.Component {

  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
        <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_process")}</h3>
            <br/>
            <SuccessBold>
                {t("question_process1")}
            </SuccessBold>
            <br/>
          
                  <div>
                      <Field
                        component={CustomTextarea}
                        labelText={t("label_process_step_1")}
                        name="process1[0]"
                        default
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                        }}
                      />
                  </div>
            
                  <div>
                      <Field
                        component={CustomTextarea}
                        labelText={t("label_process_step_2")}
                        name="process1[1]"
                        default
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                        }}
                      />
                  </div>
              
                  <div>
                      <Field
                        component={CustomTextarea}
                        labelText={t("label_process_step_3")}
                        name="process1[2]"
                        default
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                        }}
                      />
                  </div>
             
                  <div>
                      <Field
                        component={CustomTextarea}
                        labelText={t("label_process_step_4")}
                        name="process1[3]"
                        default
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                        }}
                      />
                  </div>
             
                  <div>
                      <Field
                        component={CustomTextarea}
                        labelText={t("label_process_step_5")}
                        name="process1[4]"
                        default
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                        }}
                      />
                  </div>
             
                  <div>
                      <Field
                        component={CustomTextarea}
                        labelText={t("label_process_step_6")}
                        name="process1[5]"
                        default
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                        }}
                      />
                  </div>
             
            <br/>
            <form>
                <Field
                  labelText={t("question_process2")}
                  component={CustomInputRedux}
                  name="process2"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <Field
                  labelText={t("question_process3")}
                  component={CustomInputRedux}
                  name="process3"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                <br/>
                <Field
                  labelText={t("question_process4")}
                  component={CustomInputRedux}
                  name="process4"
                  success
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 7,
                  }}
                />
                
                <br/>               
            </form>
            { programmbs.revisionprocess !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programmbs.revisionprocess}</p>                
              </div>
              :""
            }         
            <br/>           
            <Controls/>
            <ControlNavigation previous={"product"} next={"price"} />
        </CardBody>
    );
  }
}

ProcessTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(ProcessTab);


ProcessTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data, 
    programmbs: state.programmbsReducer.programmbs
  }),
  { load: loadFormProgrammbs }, 
)(ProcessTab);


export default translate(withStyles(styles)(ProcessTab));
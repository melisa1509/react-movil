import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray, arrayPush, arrayPop } from 'redux-form';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Controls from './Controls.jsx';
import RenderList from './RenderList.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Primary from "components/Typography/Primary.jsx";
import SuccessBold from "components/Typography/SuccessBold.jsx";
import Button from "components/CustomButtons/Button.jsx";

// core components
import { translate } from 'react-switch-lang';
import { loadFormProgramsa } from "actions/programsaActions.jsx";
import { AddCircle, RemoveCircle } from "@material-ui/icons";



const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};


class MisionTab extends React.Component {

  addRown = () => {    
    this.props.pushArray('programsa', "rule9", "");    
  }

  removeRow = () => {    
    this.props.popArray('programsa', "rule9");          
  }
  
  render() {
    const { classes, programsa } = this.props;
    let { t } = this.props;
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_rules")}</h3>
            <br/>
              <Primary>{t("label_rules_explanation")}</Primary>
            <br/>
            <form>
                <Field
                  labelText={t("question_rule1")}
                  component={CustomInputRedux}
                  name="rule1"
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
                  labelText={t("question_rule2")}
                  component={CustomInputRedux}
                  name="rule2"
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
                  labelText={t("question_rule3")}
                  component={CustomInputRedux}
                  name="rule3"
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
                  labelText={t("question_rule4")}
                  component={CustomInputRedux}
                  name="rule4"
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
                  labelText={t("question_rule5")}
                  component={CustomInputRedux}
                  name="rule5"
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
                  labelText={t("question_rule6")}
                  component={CustomInputRedux}
                  name="rule6"
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
                  labelText={t("question_rule7")}
                  component={CustomInputRedux}
                  name="rule7"
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
                  labelText={t("question_rule8")}
                  component={CustomInputRedux}
                  name="rule8"
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
                
                <SuccessBold>
                  {t("question_rule9")}
                </SuccessBold>
                {             
                  <FieldArray name="rule9" component={RenderList} />               
                }
                <br/>
                      <Button simple color="tumblr" onClick={this.removeRow}>
                        <RemoveCircle/>{t("button_remove_row")}
                      </Button>
                      <Button simple color="twitter" onClick={this.addRown}>
                        <AddCircle/>{t("button_add_row")}
                      </Button>                      
                <br/>
                <Field
                  labelText={t("question_rule10")}
                  component={CustomInputRedux}
                  name="rule10"
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
            { programsa.revisionrule !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programsa.revisionrule}</p>                
              </div>
              :""
            }           
            <br/>           
            <Controls/>
          </CardBody>
        </Card>
    );
  }
}

MisionTab = reduxForm({
  form: 'programsa',
  enableReinitialize: true,
})(MisionTab);


MisionTab = connect(
  state => ({
    initialValues: state.programsaReducer.data, 
    programsa: state.programsaReducer.programsa
  }),
  { load: loadFormProgramsa, pushArray: arrayPush, popArray: arrayPop }, 
)(MisionTab);


export default translate(withStyles(styles)(MisionTab));


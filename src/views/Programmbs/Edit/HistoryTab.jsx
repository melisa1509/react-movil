import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { BASE_URL } from 'constants/urlTypes';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";
import FileUpload from "components/CustomUpload/FileUpload.jsx";
import SuccessBold from "components/Typography/SuccessBold.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Primary from "components/Typography/Primary.jsx";
import CategorySelect from "views/Select/CategorySelect.jsx";
import Button from "components/CustomButtons/Button.jsx";

// core components
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';

import { translate } from 'react-switch-lang';
import { loadFormProgrammbs } from "actions/programmbsActions.jsx";


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};




class HistoryTab extends React.Component {

  updateFileName = (key) => {
    this.props.change('history6', key);
  }

  render() {
    const { classes, programmbs, form_programmbs } = this.props;
    let { t } = this.props;
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_history")}</h3>
            <br/>
            <SuccessBold>
              {t("question_history1")}
            </SuccessBold>
            <br/>
            <form>
                <Field
                  component={CustomInputRedux}
                  name="history1"
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
                {
                  programmbs.history2 !== "undefined" && programmbs.history2 !== undefined ?
                  <a
                    href={BASE_URL +  "/web/file/"  + programmbs.history2}
                    target="_blank"
                  >
                      {t("label_download_file")}
                  </a>:
                  ""
                }               
                <br/>
                <InputLabel className={classes.label}>
                    <SuccessLabel className={classes.label}>{t("question_history2")}</SuccessLabel>
                </InputLabel>
                <Field
                  component={FileUpload}
                  name="history2"
                  changeFileName = {this.updateFileName}
                  inputProps={{
                    type: "file",
                  }}
                />      
                <br/>       
                <Primary>{t("label_permission_personal_information")}</Primary>   
                <SuccessBold>{t("question_history3")}</SuccessBold>
                <br/>
                <Field
                    labelText={t("question_history4")}
                    component={CustomInputRedux}
                    name="history3"
                    success
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                  />
                  <br/>
                  <h3 className={classes.cardTitleCenter} >{t("title_worldwide_directory")}</h3>
                  <p className={classes.cardTitleCenter} >{t("label_worldwide_directory_explanation")}</p>
                <br/>
                <Field
                    labelText={t("question_promotion_product_name")}
                    component={CustomInputRedux}
                    name="product_name"
                    success
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text"
                    }}
                />
                <br/>
                <Field
                    labelText={t("question_promotion_product_description")}
                    component={CustomInputRedux}
                    name="product_description"
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
                    labelText={t("question_promotion_product_contact")}
                    component={CustomInputRedux}
                    name="product_phone"
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
                <GridContainer >
                  <GridItem xs={12} sm={12} md={4}>
                    <Field
                      component={CategorySelect}
                      name="product_web"
                    />
                  </GridItem>
                </GridContainer>
                <br/>
                <br/>
                <br/>
                {
                  programmbs.promotion5 !== "undefined" && programmbs.promotion6 !== undefined ?
                  <a
                    href={BASE_URL +  "/web/file/"  + programmbs.promotion6}
                    target="_blank"
                  >
                      {t("label_download_file")}
                  </a>:
                  ""
                }                
                <br/>
                <SuccessBold>
                  {t("question_promotion6")}
                </SuccessBold>
                <Field
                  component={FileUpload}
                  name="promotion6"
                  changeFileName = {this.updateFileName2}
                  inputProps={{
                    type: "file",
                  }}
                />
                <br/>
                <br/>
                <SuccessBold>
                  {t("question_promotion7")}
                </SuccessBold>
                <Button color="facebook" onClick={this.handleFacebook} target="blank_" href="http://www.facebook.com/groups/interweavesolutionsmbsgroups">
                  <i className="fab fa-facebook-square"/>{" "}
                  {t("button_join_facebook_group")}
                </Button>
                <br/>             
            </form>         
            <br/>
            <Controls/>
            <ControlNavigation previous={"service"} next={"plan"} />
          </CardBody>
        </Card>
    );
  }
}

HistoryTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(HistoryTab);


HistoryTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data, 
    form_programmbs: state.form.programmbs,
    programmbs: state.programmbsReducer.programmbs
  }),
  { load: loadFormProgrammbs }, 
)(HistoryTab);


export default translate(withStyles(styles)(HistoryTab));
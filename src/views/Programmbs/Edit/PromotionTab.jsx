import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { BASE_URL } from 'constants/urlTypes';

// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInputRedux from 'components/CustomInput/CustomInputRedux.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import SuccessLabel from "components/Typography/SuccessLabel.jsx";
import FileUpload from "components/CustomUpload/FileUpload.jsx";
import Primary from "components/Typography/Primary.jsx";

// core components
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import SuccessBold from "components/Typography/SuccessBold.jsx";
import Button from "components/CustomButtons/Button.jsx";


import { translate } from 'react-switch-lang';
import { loadFormProgrammbs } from "actions/programmbsActions.jsx";
import CategorySelect from "views/Select/CategorySelect.jsx";


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};




class PromotionTab extends React.Component {

  updateFileName = (key) => {
    this.props.change('promotion5', key);
  }

  updateFileName2 = (key) => {
    this.props.change('promotion6', key);
  }

  handleFacebook = () => {
    this.props.change('promotion7', "state.joined_facebook" );
  }

  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_promotion")}</h3>
            <br/>
            <form>
                <Field
                  labelText={t("question_promotion1")}
                  component={CustomInputRedux}
                  name="promotion1"
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
                  labelText={t("question_promotion2")}
                  component={CustomInputRedux}
                  name="promotion2"
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
                  labelText={t("question_promotion3")}
                  component={CustomInputRedux}
                  name="promotion3"
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
                  labelText={t("question_promotion4")}
                  component={CustomInputRedux}
                  name="promotion4"
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
                {
                  programmbs.promotion5 !== "undefined" && programmbs.promotion5 !== undefined ?
                  <a
                    href={BASE_URL +  "/web/file/"  + programmbs.promotion5}
                    target="_blank"
                  >
                      {t("label_download_file")}
                  </a>:
                  ""
                }                
                <br/>
                <InputLabel className={classes.label}>
                    <SuccessLabel className={classes.label}>{t("question_promotion5")}</SuccessLabel>
                </InputLabel>
                <Field
                  component={FileUpload}
                  name="promotion5"
                  changeFileName = {this.updateFileName}
                  inputProps={{
                    type: "file",
                  }}
                />                
                <br/>
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
            { programmbs.revisionpromotion !== undefined ?
              <div>
                <br/>
                <br/>
                <Primary> { t("label_correction_comments")+ " *" } </Primary>
                <p>{programmbs.revisionpromotion}</p>                
              </div>
              :""
            }         
            <br/>
            <Controls/>
            <ControlNavigation previous={"price"} next={"paperwork"} />
          </CardBody>
        </Card>
    );
  }
}

PromotionTab = reduxForm({
  form: 'programmbs',
  enableReinitialize: true,
})(PromotionTab);


PromotionTab = connect(
  state => ({
    initialValues: state.programmbsReducer.data,
    programmbs: state.programmbsReducer.programmbs 
  }),
  { load: loadFormProgrammbs }, 
)(PromotionTab);


export default translate(withStyles(styles)(PromotionTab));
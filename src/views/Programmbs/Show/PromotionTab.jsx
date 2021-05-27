import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";
import cx from "classnames";
import { BASE_URL } from 'constants/urlTypes';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import MutedText from "components/Typography/Muted.jsx";
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import RevisionForm from './RevisionForm.jsx';
import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
  ...footerStyle
};


class PromotionTab extends React.Component {

  
  render() {
    const { classes, programmbs, fluid, white } = this.props;
    let { t } = this.props;
    var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
    return (
        <Card >
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_promotion")}</h3>
            <br/>
            <SuccessBold>
              {t("question_promotion1")}
            </SuccessBold>
            <br/>
            <SuccessBold>
              {t("question_promotion2")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.promotion2}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_promotion3")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.promotion3}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_promotion4")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.promotion4}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_promotion5")}
            </SuccessBold>
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
            <br/>
            <h3 className={classes.cardTitleCenter} >{t("title_worldwide_directory")}</h3>
            <p className={classes.cardTitleCenter} >{t("label_worldwide_directory_explanation")}</p>
            <br/>
            <SuccessBold>
              {t("question_promotion_product_name")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.product_name}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_promotion_product_description")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.product_description}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_promotion_product_contact")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.product_phone}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("label_category")}
            </SuccessBold>
            <br/>
            <MutedText>
              {t(programmbs.product_web)}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_promotion6")}
            </SuccessBold>
            <br/>
            {
                  programmbs.promotion6 !== "undefined" && programmbs.promotion6 !== undefined ?
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
              {t("question_promotion7")}
            </SuccessBold>
            <br/>
            <MutedText>
              {t(programmbs.promotion7)}
            </MutedText>


            <RevisionForm name="revisionpromotion" labelText={t("label_revision_promotion")+ " *"} />
            <br/>
            <Controls/>
            <ControlNavigation previous={"price"} next={"paperwork"} />
          </CardBody>
        </Card>
    );
  }
}

PromotionTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
  
});


const PromotionTabComponent = translate(withStyles(styles)(PromotionTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(PromotionTabComponent);
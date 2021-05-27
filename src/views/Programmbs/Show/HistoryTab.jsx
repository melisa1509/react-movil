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
import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
  ...footerStyle
};


class HistoryTab extends React.Component {

  
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
            <h3 className={classes.cardTitleCenter} >{t("title_history")}</h3>
            <br/>
            <SuccessBold>
              {t("question_history1")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.history1}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_history2")}
            </SuccessBold>
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
            <SuccessBold>
              {t("question_history4")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.history3}
            </MutedText>
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
            <Controls/>
            <ControlNavigation previous={"service"} next={"plan"} />
          </CardBody>
        </Card>
    );
  }
}

HistoryTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
  
});


const HistoryTabComponent = translate(withStyles(styles)(HistoryTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(HistoryTabComponent);
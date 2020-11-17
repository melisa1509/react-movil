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


class ServiceTab extends React.Component {

  
  render() {
    const { classes, programmbs, fluid, white } = this.props;
    let { t } = this.props;
    var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
    return (
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_service")}</h3>
            <br/>
            <SuccessBold>
              {t("question_service1")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.service1}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_service2")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.service2}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_service3")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.service3}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_service4")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.service4}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_service5")}
            </SuccessBold>
            <br/>
            <MutedText>
              {programmbs.service5}
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_service6")}
            </SuccessBold>
            <br/>
            {
                  programmbs.service6 !== undefined ?
                  <a
                    href={BASE_URL +  "/web/file/"  + programmbs.service6}
                    target="_blank"
                  >
                      {t("label_download_file")}
                  </a>:
                  ""
                }
            <br/>
            <RevisionForm name="revisionservice" labelText={t("label_revision_service")+ " *"} />
            <br/>
            <Controls/>
            <ControlNavigation previous={"quality"} next={"history"} />
          </CardBody>
    );
  }
}

ServiceTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
  
});


const ServiceTabComponent = translate(withStyles(styles)(ServiceTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ServiceTabComponent);
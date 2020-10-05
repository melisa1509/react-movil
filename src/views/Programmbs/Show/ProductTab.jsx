import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// core components
import SuccessBold from "components/Typography/SuccessBold.jsx";
import MutedText from "components/Typography/Muted.jsx";
import Controls from './Controls.jsx';
import ControlNavigation from './ControlNavigation.jsx';
import RevisionForm from './RevisionForm.jsx';

import { translate } from 'react-switch-lang';


const styles = {
  cardTitleCenter:{
    textAlign: "center"
  }, 
};


class ProductTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        revisionProduct: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const params = {
      name: e.target.name,
      value: e.target.value
    }
    this.props.dispatchUpdateRevisionProgrammbs(params);
  }
 
  
  render() {
    const { classes, programmbs } = this.props;
    let { t } = this.props;
    return (
          <CardBody>
            <h3 className={classes.cardTitleCenter} >{t("title_product")}</h3>
            <br/>
            <SuccessBold>
              {t("question_product1")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product1 }
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_product2")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product2 }
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_product3")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product3 }
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_product4")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product4 }
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_product5")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product5 }
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_product6")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product6 }
            </MutedText>
            <br/>
            <SuccessBold>
              {t("question_product7")}
            </SuccessBold>
            <br/>
            <MutedText>
              { programmbs.product7 }
            </MutedText>
            <br/>
            <RevisionForm name="revisionproduct" labelText={t("label_revision_product")+ " *"}/>
            <Controls/>
            <ControlNavigation previous={"plan"} next={"process"} />
          </CardBody>
    );
  }
}

ProductTab.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({ 
  programmbs: state.programmbsReducer.programmbs
});

const mapDispatchToPropsActions = dispatch => ({
});


const ProductTabComponent = translate(withStyles(styles)(ProductTab));
export default connect(mapStateToProps, mapDispatchToPropsActions)(ProductTabComponent);
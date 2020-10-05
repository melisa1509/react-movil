import React from "react";
import PropTypes from "prop-types";
import { translate } from 'react-switch-lang';
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";

import { store } from "store";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Domain from "@material-ui/icons/Domain";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Timeline from "@material-ui/icons/Timeline";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import FileCopy from "@material-ui/icons/FileCopy";
import AccessibityNew from "@material-ui/icons/AccessibilityNew";
import PanTool from "@material-ui/icons/PanTool";
import Face from "@material-ui/icons/Face";


// core components
import Accordion from "components/Accordion/Accordion.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import PlanTab from "./PlanTab.jsx";
import ProductTab from "./ProductTab.jsx";
import ProcessTab from './ProcessTab.jsx';
import PriceTab from './PriceTab.jsx';
import PromotionTab from './PromotionTab.jsx';
import PaperworkTab from './PaperworkTab.jsx';
import QualitylifeTab from './QualitylifeTab.jsx';
import ServiceTab from './ServiceTab.jsx';
import HistoryTab from './HistoryTab.jsx';


// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';


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




class ShowForm extends React.Component { 

    
    render() {
        const { classes, programmbs, progressmbs, form_programmbs } = this.props;
        let { t } = this.props;
        return (
          <Accordion
                  active={0}
                  collapses={[
                    {
                      title: t("title_plan") + " " + progressmbs.plan,
                      content:(<PlanTab />)
                    },
                    {
                      title: t("title_product")+ " " + progressmbs.product,
                      content:(<ProductTab />)
                    },
                    {
                      title: t("title_process")+ " " + progressmbs.process,
                      content:(<ProcessTab />)
                    },
                    {
                      title: t("title_price")+ " " + progressmbs.price,
                      content:(<PriceTab />)
                    },
                    {
                      title: t("title_promotion")+ " " + progressmbs.promotion,
                      content:(<PromotionTab />)
                    },
                    {
                      title: t("title_paperwork")+ " " + progressmbs.paperwork,
                      content:programmbs.paperwork4.p4_array === undefined ? "" : (
                        <PaperworkTab />)
                    },
                    {
                      title: t("title_quality_life")+ " " + progressmbs.quality,
                      content: form_programmbs === undefined ? "" : (
                        <QualitylifeTab />)
                    },                   
                    {
                      title: t("title_service")+ " " + progressmbs.service,
                      content:(<ServiceTab />)
                    },
                    {
                      title: t("title_history"),
                      content:(<HistoryTab />)
                    },
                  ]}
                />
                
        );
    }
}

const mapStateToProps = state => ({ 
      programmbs: state.programmbsReducer.programmbs,
      progressmbs: state.studentReducer.dashboard_student.progressMbs,
      active_tab: state.programmbsReducer.active_tab,
      form_programmbs: state.form.programmbs      
});

const mapDispatchToPropsActions = dispatch => ({
  
});

const ShowFormComponent = translate(withStyles(style)(ShowForm));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowFormComponent));




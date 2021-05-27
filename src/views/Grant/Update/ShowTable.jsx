import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showGrant } from "actions/grantActions.jsx";
import { showGrantAmbassador } from "actions/grantActions.jsx";
import { newGrantUpdate } from "actions/grantActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import GroupTable from "./GroupTable";
import GroupAmbassadorTable from "./GroupAmbassadorTable";

// core components
import Danger from "components/Typography/Danger.jsx";


// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';
import { monthDate } from "assets/functions/general";


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
    ...validationFormsStyle,
    ...customSelectStyle
};

class ShowTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

    componentWillMount() {
      this.props.dispatchShowGrant(this.props.match.params.grant);
      this.props.dispatchShowGrantAmbassador(this.props.match.params.id);
    }
   

    render() {
        const { show_grant, show_grant_ambassador, active_user} = this.props;
        let { t } = this.props;
        
        return (
          <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <center><h3 >{t("title_grant_overview")}</h3></center>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                   
                          {show_grant_ambassador.state === "state.approved" ? <center><Danger><h5>{t("label_grant_application_approved")}</h5></Danger></center>: ""}
                          {show_grant_ambassador.state === "state.approved" ? <div>{show_grant_ambassador.correction}</div>: ""}
                          <br/>
                        
                  </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                    <Table
                      striped
                      tableData={[
                        [<th>{t("label_administrator")}</th>,show_grant.administrator.first_name+ " "+ show_grant.administrator.last_name,],
                        [<th>{t("label_date")}</th>, monthDate(show_grant_ambassador.created_at)],                        
                        [<th>{t("label_language")}</th>, t(show_grant.language)],
                        [<th>{t("label_ambassador")}</th>, show_grant_ambassador.ambassador.first_name + " " + show_grant_ambassador.ambassador.last_name],
                        [<th>{show_grant.type === "state.scholarship" ? t("label_number_participants_trained") : t("question_startup_number")}</th>, show_grant_ambassador.number],
                        [<th>{t("label_type_grant")}</th>, t(show_grant.type)],
                        [<th>{t("label_total_amount_approved")}</th>, show_grant_ambassador.amount],
                        
                      ]}
                    />
                  <br/>
                  </GridItem>
                  <br/>
                  <center><h4 >{t("title_groups_created")}</h4></center>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={11}>
                        { active_user.roles.includes("ROLE_LANGUAGE_ADMIN") || active_user.roles.includes("ROLE_ADMIN") ?
                          <GroupTable/>
                          :
                          <GroupAmbassadorTable/>
                        }
                        <br/><br/>
                    </GridItem>
                  </GridContainer>
            </GridContainer>
                
        );
    }
}
const mapStateToProps = state => ({ 
  show_grant: state.grantReducer.show_grant,
  delete_grant: state.grantReducer.delete_grant, 
  show_grant_ambassador: state.grantReducer.show_grant_ambassador,
  active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchNewGrantUpdate: () => dispatch(newGrantUpdate()),
  dispatchDeleteSuccessful: () => dispatch(deleteSuccessful()),
  dispatchShowGrant: key => dispatch(showGrant(key)),
  dispatchShowGrantAmbassador: key => dispatch(showGrantAmbassador(key)),
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));



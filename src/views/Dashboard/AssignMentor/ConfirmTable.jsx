import React from "react";
import { translate } from "react-translate";
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showUser } from "actions/userActions.jsx";
import { showGroup } from "actions/groupActions.jsx";
import { confirmGroup } from 'actions/dashboardActions.jsx';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

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
};

class ConfirmTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
        this.saveClick = this.saveClick.bind(this);
    }

    saveClick(){
      const params = {
        group: this.props.match.params.group,
        student: this.props.match.params.student
      }
      this.props.dispatchConfirmGroup(params, this.props.history );
    }
   
    componentDidMount() {
      this.props.dispatchShowUser(this.props.match.params.student);
      this.props.dispatchShowGroup(this.props.match.params.group);
    }

    render() {
        const { show_user, show_group } = this.props;
        let { t } = this.props;
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
            <Table
              striped
              tableHead={[]}
              tableData={[
                [<th>{t("label.name")}</th>,show_user.first_name],
                [<th>{t("label.lastName")}</th>,show_user.last_name],
                [<th>{t("label.group")}</th>,show_group.name],
                [<th>{t("label.embassador_mentor")}</th>, show_group.embassador.first_name + " " + show_group.embassador.last_name],
              ]}
            />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/dashboard/assignmentor/" + this.props.match.params.student}>
                      <Button color="defautl" size="sm">
                      {t("button.return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Button color="success" size="sm" onClick={this.saveClick}>
                      {t("button.confirm_assing")}
                      </Button>
                      {" "}
                      </center>
                  </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
                
        );
    }
}
const mapStateToProps = state => ({ 
  show_user: state.userReducer.show_user,
  show_group: state.groupReducer.show_group
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowUser: key => dispatch(showUser(key)), 
  dispatchShowGroup: key => dispatch(showGroup(key)),
  dispatchConfirmGroup: (params, history ) => dispatch(confirmGroup(params, history))
});

const ConfirmTableComponent = translate('provider')(withStyles(style)(ConfirmTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ConfirmTableComponent));



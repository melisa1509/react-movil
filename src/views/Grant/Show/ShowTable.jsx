import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showGrant } from "actions/grantActions.jsx";
import { deleteGrant } from "actions/grantActions.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { withRouter } from 'react-router-dom';
import { showDate } from "assets/functions/general.jsx";

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
     this.deleteClick = this.deleteClick.bind(this);
    }

    deleteClick() {
      this.props.dispatchDeleteGrant(this.props.match.params.id,  this.props.history);
    }
    componentDidMount() {
      this.props.dispatchShowGrant(this.props.match.params.id);
    }

    render() {
        const { show_grant, grant_deadline} = this.props;
        let { t } = this.props;
       
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Table
                striped
                tableHead={[]}
                tableData={[
                  [<th>{t("label_administrator")}</th>,show_grant.administrator.first_name+ " "+ show_grant.administrator.last_name,],
                  [<th>{t("label_language")}</th>, t(show_grant.language)],
                  [<th>{t("label_type_grant")}</th>, t(show_grant.type)],
                  [<th>{t("label_state")}</th>, t(show_grant.state)],
                ]}
              />
              <Table
                tableData={[
                  [<div dangerouslySetInnerHTML={{ __html: show_grant.description }}></div>],
                ]}
              />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/grant"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/grant/edit/" + show_grant.id}>
                      <Button color="info" size="sm">
                      {t("button_edit")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Button color="danger" size="sm" onClick={this.deleteClick}>
                      {t("button_delete")}
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
  show_grant: state.grantReducer.show_grant,
  delete_grant: state.grantReducer.delete_grant, 
  successful_delete: state.generalReducer.successful_delete,
  grant_deadline: state.grantReducer.grant_deadline
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGrant: key => dispatch(showGrant(key)), 
  dispatchDeleteGrant: (key, history) => dispatch(deleteGrant(key, history))
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));



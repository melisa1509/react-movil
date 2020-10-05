import React from "react";
import { translate } from 'react-switch-lang';
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import { connect } from "react-redux";
import { showGroup } from "actions/groupActions.jsx";
import { deleteGroup } from "actions/groupActions.jsx";

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
      this.props.dispatchDeleteGroup(this.props.match.params.id,  this.props.history);
    }
    componentDidMount() {
      this.props.dispatchShowGroup(this.props.match.params.id);
    }

    render() {
        const { show_group, successful_delete } = this.props;
        let { t } = this.props;
        let i = 0;
        let start_date=[];
        let final_date=[];
          for (i = 0; i < 10 ; i++) {
              start_date[i]=show_group.start_date[i]
              final_date[i]=show_group.final_date[i]
          }
        return (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
            <Table
              striped
              tableHead={[]}
              tableData={[
                [<th>{t("label_name")}</th>,show_group.name],
                [<th>{t("label_embassador_mentor")}</th>,show_group.embassador.first_name+ " "+ show_group.embassador.last_name,],
                [<th>{t("label_start_date")}</th>,start_date],
                [<th>{t("label_final_date")}</th>,final_date],
                [<th>{t("label_number_students_enrolled")}</th>,show_group.number_students],
                [<th>{t("label_modality")}</th>,show_group.modality === undefined ? "" : t(show_group.modality)],
                [<th>{t("label_program")}</th>,show_group.program === undefined ? "" : t(show_group.program)],
              ]}
            />
            <br/>
             <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/group"}>
                      <Button color="default" size="sm">
                      {t("button_return_to_list")}
                      </Button>
                      {" "}
                      </Link>{" "}
                      <Link to={"/group/edit/" + show_group.id}>
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
  show_group: state.groupReducer.show_group,
  delete_group: state.groupReducer.delete_group, 
  successful_delete: state.generalReducer.successful_delete
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGroup: key => dispatch(showGroup(key)), 
  dispatchDeleteGroup: (key, history) => dispatch(deleteGroup(key, history))
});

const ShowTableComponent = translate(withStyles(style)(ShowTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(ShowTableComponent));



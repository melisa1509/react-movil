import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from "react-bootstrap-sweetalert";


import { connect } from "react-redux";
import { getGroupList } from "actions/groupActions.jsx";
import { translate } from 'react-switch-lang';
import { showDate } from 'assets/functions/general.jsx';
import { Field, reduxForm } from 'redux-form';
import { newGrantGroup } from "actions/grantActions";
import { withRouter } from 'react-router-dom';


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckboxRedux.jsx';
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import { showGrantGroup } from "actions/grantActions";



const style = {
    infoText: {
      fontWeight: "500",
      textAlign: "left"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px"
    },
    label:{
      color:"red",
      fontSize:"30px"
    },
    ...customSelectStyle,
    ...sweetAlertStyle
};


class GroupAmbassadorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      filterAll: '',
      
    };
    this.filterAll = this.filterAll.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.deleteClick= this.deleteClick.bind(this);
  }

  onFilteredChange(filtered) {
    
    if (filtered.length > 1 && this.state.filterAll.length) {
      const filterAll = '';
      this.setState({ filtered: filtered.filter((item) => item.id != 'all'), filterAll })
    }
    else
      this.setState({ filtered });
  }

  filterAll(e) {
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll }];
    this.setState({ filterAll, filtered });
  }

  searchFilter(e){
    const { value } = e.target;
    if(value.length > 1){
      this.props.dispatchDataRequested();
      this.props.dispatchSetData(value);
    }
    
  }

  componentDidMount() {
    this.props.dispatchGetGroupList();
    this.props.dispatchGetGrantGroupList(this.props.match.params.id);
  }

  saveClick() {
    this.props.dispatchNewGrantGroup(this.props.match.params.id);
  }

  deleteClick(){
    this.props.dispatchDeleteSuccessful();
  }

 
  render() {
    const { group_list, loading, successful_new_array } = this.props;
    let { t } = this.props;
            
    const data = group_list.map((prop, key) => {
    
      return {
        id: key, 
        full_name: prop.name,
        modality: t(prop.modality),
        date: showDate(prop.start_date),
        actions: (
            <Field
                component={CustomCheckbox}
                name={"groups[g-" + prop.id + "]"}
            />
        )
      };
    });
    
    return (
        <GridContainer justify="center">
            <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                      { successful_new_array ?      
                        <SweetAlert
                          success
                          style={{ display: "block", marginTop: "-100px", close:true }}
                          onConfirm={() => this.deleteClick()}
                          confirmBtnCssClass={
                              this.props.classes.button + " " + this.props.classes.success
                          }
                          confirmBtnText={t("button_continue")}
                          >
                          <h4>{t("label_save_success")}</h4>
                        </SweetAlert> 
                      : ""}
                  </GridItem>
              </GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                    inputProps={{
                        placeholder: "Search",
                        value:this.state.filterAll, 
                        onChange:this.filterAll
                    }}
                    formControlProps={{
                        fullWidth: false
                    }}
                    />
        
                    <ReactTable
                        filtered={this.state.filtered}
                        ref={r => this.reactTable = r}
                        onFilteredChange={this.onFilteredChange.bind(this)}
                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                        data={data}
                        loading={loading}

                        columns={[
                            {
                            Header: "",
                            accessor: "actions",
                            sortable: false,
                            resizable: false,
                            width:50,
                            },
                            {
                            Header: t("th_name"),
                            accessor: "full_name",
                            sortable: true,
                            resizable: false,
                            width:300
                            },
                            {
                            Header: t("th_modality"),
                            accessor: "modality",
                            width:200,
                            sortable: true,
                            resizable: false,
                            },
                            {
                            Header: t("th_created_date"),
                            accessor: "date",
                            width:200,
                            sortable: true,
                            resizable: false,
                            },                            
                            {
                            Header: "",
                            id: 'all',
                            width: 0,
                            resizable: false,
                            sortable: false,
                            
                            getProps: () => {
                                return {
                                style: {}
                                }
                            },
                            filterMethod: (filter, rows) => {
                                const result = matchSorter(rows, filter.value, {
                                keys: [
                                    "full_name",
                                    "modality"
                                ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                                });
                                return result;
                            },
                            filterAll: true,
                            }
                        ]}
                        key={data.length}
                        defaultPageSize={data.length < 10 ? data.length : 10}
                        showPaginationTop={false}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                    />
                </GridItem>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <center>
                <Button color="info" size="sm" onClick={this.saveClick.bind(this)}>
                {t("button_save_groups")}
                </Button>
                </center>
            </GridItem>
          </GridContainer>
      </GridContainer>
    );
  }
}


GroupAmbassadorTable = reduxForm({
    form: 'grantGroupform', 
    enableReinitialize: true
})(GroupAmbassadorTable);
  
  
GroupAmbassadorTable = connect(
state => ({
    initialValues: state.grantReducer.grant_group,
    group_list: state.groupReducer.group_list, 
    active_user:state.loginReducer.active_user,
    loading: state.groupReducer.loading
}),
{ dispatchGetGroupList: getGroupList, dispatchNewGrantGroup: newGrantGroup, dispatchGetGrantGroupList: showGrantGroup},
)(GroupAmbassadorTable);
  

const GroupAmbassadorTableComponent = withRouter(translate(withStyles(style)(GroupAmbassadorTable)));
export default (GroupAmbassadorTableComponent);


import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from "react-bootstrap-sweetalert";


import { connect } from "react-redux";
import { translate } from 'react-switch-lang';
import { showDate } from 'assets/functions/general.jsx';
import { showGrantGroup } from "actions/grantActions";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

// @material-ui/icons
import Create from "@material-ui/icons/Create";
import Visibility from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.jsx";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import matchSorter from 'match-sorter';
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";



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


class GroupTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      filterAll: '',
      
    };
    this.filterAll = this.filterAll.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  
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

  componentDidMount(){
    this.props.dispatchGetGrantGroup(this.props.match.params.id);
  }


  render() {
    const { show_grant_group, loading, successful_new_array } = this.props;
    let { t } = this.props;


    const list = show_grant_group === undefined ? [] : show_grant_group;
    const data = list.map((prop, key) => {
     
        return {
          id: key, 
          full_name: prop.name,
          date: showDate(prop.created_at),
          program: t(prop.program),
          projects: (
            <div className="actions-left">
              <Link to={"/group/student/" + prop.id}>
                <Button
                  size="sm"
                  color="success"
                >
                  {t('button_manage_students')}
                </Button>
              </Link>
              {" "}
              <Link to={"/group/progress/" + prop.id}>
                <Button
                  size="sm"
                  color="info"
                >
                  {t('button_project_progress')}
                </Button>
              </Link>
            </div>
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
                          
            <ReactTable
              filtered={this.state.filtered}
              ref={r => this.reactTable = r}
              onFilteredChange={this.onFilteredChange.bind(this)}
              defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
              data={data}
              loading={loading}

              columns={[
                {
                  Header: t("th_name"),
                  accessor: "full_name",
                  sortable: true,
                  resizable: false,
                  width: 300
                },  
                {
                  Header: t("th_program"),
                  accessor: "program",
                  sortable: true,
                  resizable: false,
                  width: 200
                },             
                {
                  Header: t("th_created_date"),
                  accessor: "date",
                  sortable: true,
                  resizable: false,
                  width: 150
                },               
                {
                  Header: "",
                  accessor: "projects",
                  sortable: false,
                  resizable: false,
                  width: 350
                },
                {
                  Header: "",
                  id: 'all',
                  width: 0,
                  resizable: false,
                  sortable: false,
                  
                  getProps: () => {
                    return {
                      style: { padding: "0px"}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "full_name",
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
              showPaginationBottom={false}
              className="-striped -highlight"
          />
                </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
   show_grant_group: state.grantReducer.show_grant_group,
});

const mapDispatchToPropsActions = dispatch => ({
    dispatchGetGrantGroup : key => dispatch( showGrantGroup(key)) 
});

const GroupTableComponent = translate(withStyles(style)(GroupTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(GroupTableComponent));




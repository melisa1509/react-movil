import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getGrantList, showGrantDeadline } from "actions/grantActions.jsx";
import { Link } from "react-router-dom";

// @material-ui/icons
import Create from "@material-ui/icons/Create";
import Visibility from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import { translate } from 'react-switch-lang';
import { showDate } from "assets/functions/general.jsx";




class IndexTable extends React.Component {
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

  componentDidMount() {
    this.props.dispatchGetGrantList();
    this.props.dispatchShowGrantDeadline();
  }

 
  render() {
    const { grant_list, loading, active_user, grant_deadline } = this.props;
    let { t } = this.props;

    const list = active_user.roles.includes("ROLE_LANGUAGE_ADMIN") ? grant_list.filter(prop => active_user.language_grader.includes(prop.language) )  : grant_list ;
            
    const data = list.map((prop, key) => {
     
      return {
        id: key, 
        title: prop.title,
        language: t(prop.language),
        state: t(prop.state),
        type: t(prop.type),
        deadline: showDate(grant_deadline),
        projects: (
          <div className="actions-left">
            <Link to={"/grant/application/" + prop.id}>
              <Button
                size="sm"
                color="success"
              >
                {t('button_applications')}
              </Button>
            </Link>           
          </div>
        ),
        actions: (
          <div className="actions-left">
            <Link to={"/grant/show/" + prop.id}>
              <Button
                justIcon
                round4
                simple
                color="info"
              >
                <Visibility />
              </Button>
            </Link>{" "}
            <Link to={"/grant/edit/" + prop.id}>
              <Button
                justIcon
                round
                simple             
                color="warning"
              >
                <Create />
              </Button>
            </Link>{" "}
            <Link to={"/grant/show/" + prop.id}>
              <Button
                justIcon
                round
                simple            
                color="danger"
              >
                <Close />
              </Button>
            </Link>
          </div>
        )
      };
    });
    
    return (
      <GridContainer>
        <GridItem xs={12}>
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
                  Header: t("th_title"),
                  accessor: "title",
                  sortable: true,
                  resizable: false,
                  width: 350
                },
                {
                  Header: t("th_language"),
                  accessor: "language",
                  sortable: true,
                  resizable: false,
                  width: 100
                },
                {
                  Header: t("th_state"),
                  accessor: "state",
                  sortable: true,
                  resizable: false,
                  width: 100
                },
                {
                  Header: t("label_deadline"),
                  accessor: "deadline",
                  sortable: true,
                  resizable: false,
                  width: 100
                },    
                {
                  Header: t("label_type_grant"),
                  accessor: "type",
                  sortable: true,
                  resizable: false,
                  width: 100
                },           
                {
                  Header: t("th_actions"),
                  accessor: "actions",
                  sortable: false,
                  resizable: false,
                  filterable: false,
                  width: 150
                },
                {
                  Header: "",
                  accessor: "projects",
                  sortable: false,
                  width: 130
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
                        "administrator",
                        "title",
                        "state",
                        "language",
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
                <Link to={"/grant/new"}>
                <Button color="info" size="sm">
                {t("button_create_new")}
                </Button>
                {" "}
                </Link>{" "}
                </center>
            </GridItem>
          </GridContainer>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      grant_list: state.grantReducer.grant_list, 
      loading: state.grantReducer.loading,
      active_user: state.loginReducer.active_user,
      grant_deadline: state.grantReducer.grant_deadline
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetGrantList: () => dispatch( getGrantList() ),
  dispatchShowGrantDeadline: () => dispatch( showGrantDeadline() )
});

const IndexTableComponent = translate(IndexTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);


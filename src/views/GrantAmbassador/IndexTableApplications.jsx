import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getGrantActiveList, showGrantDeadline } from "actions/grantActions.jsx";
import { Link } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import { translate } from 'react-switch-lang';
import { lastDayMonth, monthDate } from "assets/functions/general.jsx";




class IndexTableApplication extends React.Component {
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
    this.props.dispatchGetGrantActiveList();
    this.props.dispatchShowGrantDeadline();
  }

 
  render() {
      const { grant_application_list, loading, active_user, grant_deadline } = this.props;
      let { t } = this.props;
      
      const list = grant_application_list === undefined ? [] : grant_application_list;
      const data = list.map((prop, key) => {
     
      return {
        id: key, 
        title: prop.grant.title,
        state: t("label_application") + " " + t(prop.state),
        type: t(prop.grant.type),
        administrator: prop.grant.administrator.first_name + " " + prop.grant.administrator.last_name,
        date: monthDate(prop.created_at),
        projects: (
          <div className="actions-left">
            { prop.state === "state.approved" ?
            <Link to={"/grant/update/" + prop.id + "/" + prop.grant.id}>
            <Button
              size="sm"
              color="info"
            >
              {t('button_updates')}
            </Button>
          </Link>
            :
              <Link to={ "/grant/editambassador/" + prop.grant.id + "/" + prop.id }>
                <Button
                  size="sm"
                  color="success"
                >
                  {t('button_application')}
                </Button>
              </Link>
            }         
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
                  width: 250
                },
                {
                  Header: t("th_state"),
                  accessor: "state",
                  sortable: true,
                  width: 150
                },                  
                {
                  Header: t("th_type"),
                  accessor: "type",
                  sortable: true,
                  width: 100
                },              
                {
                  Header: t("th_date_application"),
                  accessor: "date",
                  sortable: true,
                  width: 170
                },              
                {
                  Header: "",
                  accessor: "projects",
                  sortable: false,
                  width: 150
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
                        "language",
                        "date",
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
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      grant_application_list: state.grantReducer.grant_active_list.grants_ambassador, 
      loading: state.grantReducer.loading,
      active_user: state.loginReducer.active_user,
      grant_deadline: state.grantReducer.grant_deadline,
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetGrantActiveList: () => dispatch( getGrantActiveList() ),
  dispatchShowGrantDeadline: () => dispatch( showGrantDeadline() )
});

const IndexTableApplicationComponent = translate(IndexTableApplication);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableApplicationComponent);


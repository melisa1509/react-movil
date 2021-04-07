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
    this.props.dispatchGetGrantActiveList();
    this.props.dispatchShowGrantDeadline();
  }

 
  render() {
      const { grant_active_list, loading, active_user, grant_deadline } = this.props;
      let { t } = this.props;   
      const list = grant_active_list === undefined ? [] : grant_active_list;         
      const data = list.map((prop, key) => {
      
      return {
        id: key, 
        title: prop.title,
        type: t(prop.type),
        administrator: prop.administrator.first_name + " " + prop.administrator.last_name,
        deadline: showDate(grant_deadline),
        projects: (
          <div className="actions-left">
            <Link to={ "/grant/newambassador/" + prop.id}>
              <Button
                size="sm"
                color="success"
              >
                {t('button_apply')}
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
                  width: 250
                },
                {
                  Header: t("th_administrator"),
                  accessor: "administrator",
                  sortable: true,
                  width: 250
                },  
                {
                  Header: t("th_type"),
                  accessor: "type",
                  sortable: true,
                  width: 200
                },              
                {
                  Header: t("label_deadline"),
                  accessor: "deadline",
                  sortable: true,
                  width: 150
                },              
                {
                  Header: "",
                  accessor: "projects",
                  sortable: false,
                  width: 200
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
      grant_active_list: state.grantReducer.grant_active_list.grants_available, 
      loading: state.grantReducer.loading,
      active_user: state.loginReducer.active_user,
      grant_deadline: state.grantReducer.grant_deadline,
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetGrantActiveList: () => dispatch( getGrantActiveList() ),
  dispatchShowGrantDeadline: () => dispatch( showGrantDeadline() )
});

const IndexTableComponent = translate(IndexTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);


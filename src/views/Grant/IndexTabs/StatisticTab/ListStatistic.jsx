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




class ListStatistic extends React.Component {
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

 
  render() {
    const { grant_list, loading, grant_deadline } = this.props;
    let { t } = this.props;
            
    const data = grant_list.map((prop, key) => {
     
      return {
        id: key, 
        title: prop.title,
        amount: prop.total_grant_amount,
        groups: prop.total_grant_groups,
        participants: prop.total_grant_participants,
        applications: prop.total_grant_applications,
        projects: (
          <div className="actions-left">
            <Link to={"/grant/statistic/group/" + prop.id}>
              <Button
                size="sm"
                color="info"
              >
                {t('button_groups')}
              </Button>
            </Link>
          </div>
        ),
       
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
                  width: 350
                },
                {
                  Header: t("th_total_amount"),
                  accessor: "amount",
                  sortable: true,
                  width: 130
                },
                {
                  Header: t("th_applications"),
                  accessor: "applications",
                  sortable: true,
                  width: 130
                },
                {
                  Header: t("th_groups"),
                  accessor: "groups",
                  sortable: true,
                  width: 110
                },    
                {
                  Header: t("th_participants"),
                  accessor: "participants",
                  sortable: true,
                  width: 130
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
                  width: 20,
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
                        "title",
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
    grant_list: state.grantReducer.show_grant_statistic.grant_list,
});

const mapDispatchToPropsActions = dispatch => ({
});

const ListStatisticComponent = translate(ListStatistic);
export default connect(mapStateToProps, mapDispatchToPropsActions)(ListStatisticComponent);


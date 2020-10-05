import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getFutureAmbassadorList } from "actions/dashboardActions.jsx";
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

class FutureAmbassadorTable extends React.Component {
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
    // NOTE: this completely clears any COLUMN filters
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
    this.props.dispatchGetFutureAmbassadorList();
  }
 
  render() {
    const { future_ambassador_list, loading } = this.props;
    let { t } = this.props;
            
    const data = future_ambassador_list.map((prop, key) => {
      return {
        id: key, 
        name: prop.first_name + " "+ prop.last_name,
        ambassador:prop.studentgroup.group.embassador.first_name + " " + prop.studentgroup.group.embassador.last_name,
        group:prop.studentgroup.group.name,
        projects: (
          <div className="actions-left">
            <Link to={"/dashboard/assignmentor/" + prop.id }>
              <Button
                size="sm"
                color="warning"
              >
                {t('button_assing_mentor')}
              </Button>
            </Link>
            {" "}
            <Link to={"/dashboard/clearpending/" + prop.id }>
              <Button
                size="sm"
                color="danger"
              >
                {t('button_clear')}
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
                  Header: t("th_name"),
                  accessor: "name",
                  width: 250,
                },
                {
                  Header: t("th_ambassador"),
                  accessor: "ambassador",
                  width: 250,
                },
                {
                  Header: t("th_group"),
                  accessor: "group",
                  width: 300,
                },
                {
                  Header: t("th_projects"),
                  accessor: "projects",
                  width: 270,
                  sortable: false,
                  filterable: false
                },
                {
                  // NOTE - this is a "filter all" DUMMY column
                  // you can't HIDE it because then it wont FILTER
                  // but it has a size of ZERO with no RESIZE and the
                  // FILTER component is NULL (it adds a little to the front)
                  // You culd possibly move it to the end
                  Header: "",
                  id: 'all',
                  width: 20,
                  resizable: false,
                  sortable: false,
                  
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "name",
                        "ambassador",
                        "group",
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
      future_ambassador_list: state.dashboardReducer.future_ambassador_list, 
      loading: state.dashboardReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetFutureAmbassadorList: () => dispatch( getFutureAmbassadorList() )
});

const FutureAmbassadorTableComponent = translate(FutureAmbassadorTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(FutureAmbassadorTableComponent);


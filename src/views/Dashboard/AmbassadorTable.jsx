import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getStudentAmbassadorList } from "actions/dashboardActions.jsx";
import { Link } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import { translate } from 'react-switch-lang';

class AmbassadorTable extends React.Component {
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
    this.props.dispatchGetStudentAmbassadorList();
  }
 
  render() {
    const { student_ambassador_list, loading } = this.props;
    let { t } = this.props;
            
    const data = student_ambassador_list.map((prop, key) => {
      return {
        id: key, 
        name: prop.student.first_name + " "+ prop.student.last_name,
        ambassador:prop.group.embassador.first_name + " " + prop.group.embassador.last_name,
        group:prop.group.name,
        projects: (
          <div className="actions-left">
            <Link to={"/programsa/show/" + prop.student.programsa.id}>
              <Button
                size="sm"
                color="info"
              >
                {t('label_ambassador')}
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
                  width: 150,
                  sortable: false,
                  filterable: false
                },
                {
                  
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
      student_ambassador_list: state.dashboardReducer.student_ambassador_list, 
      loading: state.dashboardReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetStudentAmbassadorList: () => dispatch( getStudentAmbassadorList() )
});

const AmbassadorTableComponent = translate(AmbassadorTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(AmbassadorTableComponent);


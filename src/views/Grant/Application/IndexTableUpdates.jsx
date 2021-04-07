import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';
import { grantAmbassadorApplication } from "actions/grantActions";
import { monthDate} from "assets/functions/general.jsx";




class IndexTableUpdates extends React.Component {
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
    this.props.dispatchShowGrantAmbassadorApplication(this.props.match.params.id);
  }

 
  render() {
    const { grant_ambassador_application, loading, show_grant } = this.props;
    let { t } = this.props;

    const list = grant_ambassador_application === undefined ? [] : grant_ambassador_application.filter((application) => application.state === "state.approved" );      
    const data = list.map((prop, key) => {
      
      return {
        id: key, 
        ambassador: prop.ambassador.first_name + " "+ prop.ambassador.last_name,
        state: t("label_application") + " "+ t(prop.state),
        date: monthDate(prop.create_at),
        projects: (
          <div className="actions-left">
              <Link to={"/grant/update/" + prop.id + "/" + show_grant.id}>
                <Button
                  size="sm"
                  color="info"
                >
                  {t('button_updates')}
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
                  Header: t("th_ambassador"),
                  accessor: "ambassador",
                  sortable: true,
                  width: 350
                },
                {
                  Header: t("th_state"),
                  accessor: "state",
                  sortable: true,
                  width: 200
                },
                {
                  Header: t("th_date_application"),
                  accessor: "date",
                  sortable: true,
                  width: 200
                },
                {
                  Header: "",
                  accessor: "projects",
                  sortable: false,
                  width: 300
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
                        "ambassador",
                        "state",
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
      grant_ambassador_application: state.grantReducer.grant_ambassador_application, 
      loading: state.grantReducer.loading,
      show_grant: state.grantReducer.show_grant,
      
});

const mapDispatchToPropsActions = dispatch => ({  
  dispatchShowGrantAmbassadorApplication: (key) => dispatch( grantAmbassadorApplication(key) )
});

const IndexTableUpdatesComponent = translate(IndexTableUpdates);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableUpdatesComponent));


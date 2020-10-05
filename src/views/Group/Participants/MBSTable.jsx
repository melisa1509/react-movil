import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getProjectProgress } from "actions/groupActions";
import { Link } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';


class MBSTable extends React.Component {
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
    this.props.dispatchGetProjectProgress(this.props.match.params.id);
  }

 
  render() {
    const { progress_list, loading } = this.props;
    let { t } = this.props;
            
    const data = progress_list.progressMbs.map((prop, key) => {
      return {
        id: key, 
        name: prop.name,
        plan:prop.plan,
        product:prop.product,
        process:prop.process,
        price:prop.price,
        promotion:prop.promotion,
        paperwork:prop.paperwork,
        quality:prop.quality,
        service:prop.service,
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
                  width:170
                },
                {
                  Header: t("th_plan"),
                  accessor: "plan",
                  width: 80,
                  sortable: false,
                },
                {
                  Header: t("th_product"),
                  accessor: "product",
                  width: 80,
                  sortable: false,
                },
                {
                  Header: t("th_process"),
                  accessor: "process",
                  width: 90,
                  sortable: false,
                },
                {
                  Header: t("th_price"),
                  accessor: "price",
                  width: 80,
                  sortable: false,
                },
                {
                  Header: t("th_promotion"),
                  accessor: "promotion",
                  width: 95,
                  sortable: false,
                },
                {
                  Header: t("th_paperwork"),
                  accessor: "paperwork",
                  width: 90,
                  sortable: false,
                },
                {
                  Header: t("th_quality"),
                  accessor: "quality",
                  width: 85,
                  sortable: false,
                },
                {
                  Header: t("th_service"),
                  accessor: "service",
                  width: 90,
                  sortable: false,
                },
                {
                  Header: "",
                  id: 'all',
                  width: 0,
                  resizable: false,
                  sortable: false,
                  
                  getProps: () => {
                    return {
                      style: { height:"30px"}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "name"
                      ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                    });
                    return result;
                  },
                  filterAll: true,
                }
              ]}
              key={data.length}
              defaultPageSize={data.length < 10 ? data.length : 10 }
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
      progress_list: state.groupReducer.progress_list, 
      loading: state.groupReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetProjectProgress: (key) => dispatch( getProjectProgress(key) )
});

const MBSTableComponent = translate(MBSTable);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(MBSTableComponent));


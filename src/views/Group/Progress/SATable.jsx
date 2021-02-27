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


class SATable extends React.Component {
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
            
    const data = progress_list.progressSa.map((prop, key) => {
      return {
        id: key, 
        name: prop.name,
        mision: prop.mision,
        generate:prop.generate,
        facilitate:prop.facilitate,
        graduate:prop.graduate,
        support:prop.support     
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
                  width: 220,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("title_mision"),
                  accessor: "mision",
                  width: 144,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("title_generate_groups"),
                  accessor: "generate",
                  width: 144,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("title_rules"),
                  accessor: "facilitate",
                  width: 144,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("title_graduate_groups"),
                  accessor: "graduate",
                  width: 144,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("title_support_groups"),
                  accessor: "support",
                  width: 144,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: "",
                  id: 'all',
                  width: 20,
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
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <center>
                <Link to={"/group"}>
                <Button color="default" size="sm">
                {t("button_return_to_list")}
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
      progress_list: state.groupReducer.progress_list, 
      loading: state.groupReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetProjectProgress: (key) => dispatch( getProjectProgress(key) )
});

const SATableComponent = translate(SATable);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(SATableComponent));


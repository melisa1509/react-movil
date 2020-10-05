import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getAmbassadorList } from "actions/ambassadorActions.jsx";
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
    this.props.dispatchGetAmbassadorList();
  }
 
  render() {
    const { ambassador_list, loading } = this.props;
    let { t } = this.props;
            
    const data = ambassador_list.map((prop, key) => {
      return {
        id: key, 
        name: prop.first_name + " " + prop.last_name ,
        username:prop.username,
        country:prop.country,
        code:prop.code,
        actions: (
          // we've added some custom button actions
          <div className="actions-left">
            <Link to={"/ambassador/show/" + prop.id}>
              <Button
                justIcon
                round4
                simple
                color="info"
              >
                <Visibility />
              </Button>
            </Link>{" "}
            <Link to={"/ambassador/edit/" + prop.id}>
              <Button
                justIcon
                round
                simple            
                color="warning"
              >
                <Create />
              </Button>
            </Link>{" "}
            <Link to={"/ambassador/show/" + prop.id}>
              <Button
                justIcon
                round
                simple            
                color="danger"
              >
                <Close />
              </Button>
            </Link>{" "}
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
                  width:300,
                  sortable: false,
                  filterable: false
                  
                },
                {
                  Header: t("th_username"),
                  accessor: "username",
                  width:300,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("th_country"),
                  accessor: "country",
                  width: 150,
                },
                {
                  Header: t("th_code"),
                  accessor: "code",
                  width: 150,
                },
                {
                  Header: t("th_actions"),
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                  width: 250,
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
                  
                  getProps: () => {
                    return {
                      style: { padding: "5px"}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "name",
                        "username",
                      ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                    });
                    return result;
                  },
                  filterAll: true,
                }
              ]}
              defaultPageSize={10}
              showPaginationTop={false}
              showPaginationBottom={true}
              className="-striped -highlight"
          />
        </GridItem>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <center>
                <Link to={"/ambassador/new"}>
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
      ambassador_list: state.ambassadorReducer.ambassador_list, 
      loading: state.ambassadorReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetAmbassadorList: () => dispatch( getAmbassadorList() )
});

const IndexTableComponent = translate(IndexTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);


import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getAdministratorList } from "actions/administratorActions.jsx";
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



class AdminTable extends React.Component {
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
    this.props.dispatchGetAdministratorList();
  }

 
  render() {
    const { administrator_list, loading } = this.props;
    let { t } = this.props;
            
    const data = administrator_list.map((prop, key) => {
      return {
        id: key, 
        name: prop.first_name + " " + prop.last_name,
        username:prop.username,
        country:prop.country,
        actions: (
          <div className="actions-left">
            <Link to={"/admin/show/" + prop.id}>
              <Button
                justIcon
                round
                simple
                color="info"
              >
                <Visibility />
              </Button>
            </Link>{" "}
            <Link to={"/admin/edit/" + prop.id}>
              <Button
                justIcon
                round
                simple             
                color="warning"
              >
                <Create />
              </Button>
            </Link>{" "}
            <Link to={"/admin/show/" + prop.id}>
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
                  width: 300,
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
                  width:100,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("th_actions"),
                  accessor: "actions",
                  width:300,
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
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "name",
                        "username"
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
                <Link to={"/admin/new"}>
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
      administrator_list: state.administratorReducer.administrator_list, 
      loading: state.administratorReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetAdministratorList: () => dispatch( getAdministratorList() )
});

const AdminTableComponent = translate(AdminTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(AdminTableComponent);


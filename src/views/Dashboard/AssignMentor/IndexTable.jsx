import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getGroupList } from "actions/groupActions.jsx";
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
import { translate } from "react-translate";
import { withRouter } from 'react-router-dom';




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
    this.props.dispatchGetGroupList();
    
  }

 
  render() {
    const { group_list, loading } = this.props;
    let { t } = this.props;
    const student_id = this.props.match.params.student;
    
            
    const data = group_list.map((prop, key) => {
      let i = 0;
      let start_date=[];
      for (i = 0; i < 10 ; i++) {
         start_date[i]=prop.start_date[i]
      }
      return {
        id: key, 
        full_name: prop.name,
        date:start_date,
        AmbassadorMentor: prop.embassador.first_name + " " + prop.embassador.last_name,
        projects: (
          <div className="actions-left">
            <Link to={"/dashboard/confirmmentor/"+ student_id + "/" + prop.id }>
              <Button
                size="sm"
                color="info"
              >
                {t('button.assign_to_this_group')}
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
                  Header: t("th.name"),
                  accessor: "full_name",
                  sortable: false
                },
                {
                  Header: t("th.embassador_mentor"),
                  accessor: "AmbassadorMentor",
                  sortable: false
                },
                {
                  Header: t("th.start_classes"),
                  accessor: "date",
                  sortable: false,
                  filterable: false
                },                
                {
                  Header: t("th.actions"),
                  accessor: "projects",
                  sortable: false
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
                        "full_name",
                        "AmbassadorMentor"
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
          <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/dashboard"}>
                      <Button color="defautl" size="sm">
                      {t("button.return_to_list")}
                      </Button>
                      </Link>
                      </center>
                  </GridItem>
              </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      group_list: state.groupReducer.group_list, 
      loading: state.groupReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetGroupList: () => dispatch( getGroupList() )
});

const IndexTableComponent = translate('provider')(IndexTable);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent));


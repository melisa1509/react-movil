import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { showGrantStatisticGroup } from "actions/grantActions.jsx";
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
import { showDate } from 'assets/functions/general.jsx';
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
    this.props.dispatchShowGrantStatisticGroup(this.props.match.params.id);
  }

 
  render() {
    const { show_grant_group, loading } = this.props;
    let { t } = this.props;
            
    const data = show_grant_group.map((prop, key) => {
     
      return {
        id: key, 
        full_name: prop.name,
        date: showDate(prop.start_date),
        AmbassadorMentor: prop.embassador.first_name + " " + prop.embassador.last_name,
        projects: (
          <div className="actions-left">
            <Link to={"/group/student/" + prop.id}>
              <Button
                size="sm"
                color="success"
              >
                {t('button_manage_students')}
              </Button>
            </Link>
            {" "}
            <Link to={"/group/progress/" + prop.id}>
              <Button
                size="sm"
                color="info"
              >
                {t('button_project_progress')}
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
                  Header: t("th_name"),
                  accessor: "full_name",
                  sortable: true
                },
                {
                  Header: t("th_embassador_mentor"),
                  accessor: "AmbassadorMentor",
                  sortable: true
                },
                {
                  Header: t("th_start_classes"),
                  accessor: "date",
                  sortable: false,
                  filterable: false,
                  width: 150
                },                
                {
                  Header: "",
                  accessor: "projects",
                  sortable: false,
                  width: 350
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
                        "full_name",
                        "AmbassadorMentor"
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
                <Link to={"/group/ambassador"}>
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
      show_grant_group: state.grantReducer.show_grant_group, 
      loading: state.groupReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchShowGrantStatisticGroup: key => dispatch( showGrantStatisticGroup(key) )
});

const IndexTableComponent = translate(IndexTable);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent));

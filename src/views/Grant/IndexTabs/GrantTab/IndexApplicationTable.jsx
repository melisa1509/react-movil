import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { grantAmbassadorList } from "actions/grantActions.jsx";
import { Link } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import matchSorter from 'match-sorter';
import { translate } from 'react-switch-lang';
import { BASE_URL } from 'constants/urlTypes.jsx';

class GrantTable extends React.Component {
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
    this.props.dispatchGetGrantAmbassadorList();
  }
 
  render() {
    const {  loading, grant_ambassador_list, active_user } = this.props;
    let { t } = this.props;

    const list = active_user.roles.includes("ROLE_LANGUAGE_ADMIN") ? grant_ambassador_list.filter(prop => active_user.language_grader.includes(prop.grant.language) )  : grant_ambassador_list ;
            
            
    const data = list.map((prop, key) => {
      return {
        id: key, 
        title: prop.grant.title,
        administrator: prop.grant.administrator.first_name + " " + prop.grant.administrator.last_name,
        ambassador:prop.ambassador.first_name + " " + prop.ambassador.last_name,
        language: t(prop.grant.language),
        projects: (
          <div className="actions-left">
            <Link to={"/grant/showambassador/" + prop.grant.id + "/" + prop.id}>
              <Button
                size="sm"
                color="rose"
              >
                {t('button_application')}
              </Button>
            </Link>
            {" "}
              <Button
                size="sm"
                color="info"
                href={ BASE_URL + "/file/grantapplication/" + prop.id}
                target="_blank"
              >
                {t('button_download_pdf')}
              </Button>
            
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
                  Header: t("th_title"),
                  accessor: "title",
                  width: 250,
                  resizable: false,
                  sortable: true
                },
                {
                  Header: t("th_ambassador"),
                  accessor: "ambassador",
                  width: 250,
                  resizable: false,
                  sortable: true
                },               
                {
                  Header: t("th_language"),
                  accessor: "language",
                  width: 100,
                  resizable: false,
                  sortable: true
                },
                {
                  Header: "",
                  accessor: "projects",
                  width: 350,
                  sortable: false,
                  resizable: false,
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
                      style: { padding: "5px"}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "title",
                        "ambassador",
                        "administrator",
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
      grant_ambassador_list: state.grantReducer.grant_ambassador_list, 
      loading: state.grantReducer.loading,
      active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetGrantAmbassadorList: () => dispatch( grantAmbassadorList() )
});

const GrantTableComponent = translate(GrantTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(GrantTableComponent);


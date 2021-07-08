import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getGroupList } from "actions/groupActions.jsx";
import { Link } from "react-router-dom";
import { showDate } from 'assets/functions/general.jsx';

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
            
    const data = group_list.map((prop, key) => {
     
      return {
        id: key, 
        full_name: prop.name,
        date:showDate(prop.start_date),
        AmbassadorMentor: prop.embassador.first_name + " " + prop.embassador.last_name,
        projects: (
          <div className="actions-left">
            <Link to={"/certificate/list/student/"+ prop.id}>
              <Button
                size="sm"
                color="success"
              >
                {t('button_certificates')}
              </Button>
            </Link> 
            {" "}
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
                  accessor: "full_name",
                  width:300,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_embassador_mentor"),
                  accessor: "AmbassadorMentor",
                  width:300,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_start_classes"),
                  accessor: "date",
                  width:150,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: "",
                  accessor: "projects",
                  width:250,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: "",
                  id: 'all',
                  width: 20,
                  resizable: false,
                  sortable: false,
                  
                  getProps: () => {
                    return {
                      style: { height: "40px"}
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

const IndexTableComponent = translate(IndexTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);


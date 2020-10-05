import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getMbsStudentList } from "actions/studentActions.jsx";
import { Link } from "react-router-dom";

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
    this.props.dispatchGetMbsStudentList();
  }

 
  render() {
    const { student_list, loading } = this.props;
    let { t } = this.props;
            
    const data = student_list.map((prop, key) => {
      let projectState = "";
      let buttonMbs = false;
      let buttonSa = false;
      let idMbs = "";
      let idSa = "";
      let labelButton = t('button_mbs');
      let colorButton = "success";

      if (prop.studentgroup !== undefined){
        if(prop.studentgroup.group !== undefined){
          if(prop.studentgroup.group.program === "option.program4"){
            labelButton =  t('button_mbs_jr');
            colorButton =  "warning";
          }          
        }        
      }
      if (prop.programsa !== undefined) {
            projectState = t("label_project_ambassador") + " " +  t(prop.programsa.state);
            buttonSa =  true;
            idSa = prop.programsa.id;
            
      }
      else if(prop.programmbs !== undefined){
            projectState = t("state_project_mbs") + " " +  t(prop.programmbs.state);
      }
      else{
            projectState = t("label_project_mbs") + " " +  t("state_without_starting");
      }

      if(prop.programmbs !== undefined){
        buttonMbs =  true;
        idMbs = prop.programmbs.id;
      }      

      var groups = (prop.studentgroup !== undefined ? prop.studentgroup.group.name : "") + (prop.studentambassadorgroup !== undefined ? " / " + prop.studentambassadorgroup.group.name : "");
      return {
        id: key, 
        full_name: prop.first_name + " "+ prop.last_name,
        group: groups,
        state: projectState,
        projects: (
          <div className="actions-left">
            <Link to={"/ambassadorstudent/assignmentor/" + prop.id }>
              <Button
                size="sm"
                color="warning"
              >
                {t('button_assing_mentor')}
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
                  Header: t("label_name"),
                  accessor: "full_name",
                  width: 300,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("label_state"),
                  accessor: "state",
                  width: 200,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_group"),
                  accessor: "group",
                  width: 300,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_projects"),
                  accessor: "projects",
                  width: 250,
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
                      // style: { padding: "0px"}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    // using match-sorter
                    // it will take the content entered into the "filter"
                    // and search for it in EITHER the firstName or lastName
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "full_name",
                        "state"
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
      student_list: state.studentReducer.mbs_student_list, 
      loading: state.studentReducer.loading
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetMbsStudentList: key => dispatch( getMbsStudentList(key) )
});

const IndexTableComponent = translate(IndexTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);


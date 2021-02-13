import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";
import { getGroupList } from "actions/groupActions.jsx";
import { Link } from "react-router-dom";

// @material-ui/icons
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from '@material-ui/icons/Face';

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
      showPagination: false,
      pageSize: 0
      
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
    if(value.length > 1){
      this.setState({showPagination: true, pageSize:10 })
    }
    else{
      this.setState({showPagination: false, pageSize:0 })
    }
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
        actions: (
          <div className="actions-left">
            <Link to={"/register/new/" + prop.id}>
              <Button
                size="sm"
                color="info"
              >
                {t('button_register')}
              </Button>
            </Link>
            {" "}
          </div>
        ),
        full_name: prop.name,
        modality:t(prop.modality),
        AmbassadorMentor: prop.embassador.first_name + " " + prop.embassador.last_name,
        id_group:prop.id
        
      };
    });
    
    return (
      <GridContainer>
        <GridItem xs={12}>
        <center> 
        <CustomInput
          inputProps={{
            endAdornment: (<InputAdornment position="start"><Face/></InputAdornment>),
            placeholder: "Search",
            value:this.state.filterAll, 
            onChange:this.filterAll
          }}
          formControlProps={{
            fullWidth: false
          }}
        />
        </center>
          <ReactTable
              filtered={this.state.filtered}
              ref={r => this.reactTable = r}
              onFilteredChange={this.onFilteredChange.bind(this)}
              defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
              data={data}
              loading={loading}
              columns={[
                {
                  Header: t("th_group"),
                  accessor: "full_name",
                  width:220,
                  sortable: false,
                },
                {
                  Header: t("th_actions"),
                  accessor: "actions",
                  width:100,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("th_embassador_mentor"),
                  accessor: "AmbassadorMentor",
                  width:250,
                  sortable: false
                },
                {
                  Header: t("th_modality"),
                  accessor: "modality",
                  width:130,
                  sortable: false
                },
                {
                  Header: t("th_id"),
                  accessor: "id_group",
                  sortable: false,
                  width:70
                },
                
                {
                  Header: "",
                  id: 'all',
                  width: 10,
                  resizable: false,
                  sortable: false,
                  
                  getProps: () => {
                    return {
                      style: {}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "AmbassadorMentor"
                      ], threshold: matchSorter.rankings.WORD_STARTS_WITH
                    });
                    return result;
                  },
                  filterAll: true,
                }
              ]}
              key={data.length}
              pageSize={this.state.pageSize}
              showPaginationBottom={this.state.showPagination}
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


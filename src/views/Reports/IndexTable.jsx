import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';

import DragHandle from "@material-ui/icons/DragHandle";
import Navigation from "@material-ui/icons/Navigation";
import SignalWifi from "@material-ui/icons/SignalWifi4Bar";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import { getReports } from "actions/reportActions.jsx";
import Info from "components/Typography/Info.jsx";
import Success from "components/Typography/Success";
import Danger from "components/Typography/Danger";

var equal = false
var improvement = false
var worsen = false
const compare =(param1, param2 , param3)=>{
  if(param1 == param2){
    return (
      <Info>
        <DragHandle/> 
      </Info>
    )
  }
  else if(param1 == param3){
    return(
      <Success>
        <Navigation/> 
      </Success>
    )
  }
  else{
    return (
      <Danger>
        <SignalWifi/> 
      </Danger>
    )
  }
}


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
    this.props.dispatchGetReports();
  }

 
  render() {
    const { report_list, loading} = this.props;
    let { t } = this.props;
    const list = report_list.evaluations === undefined ? [] : report_list.evaluations; 
            
    const data = list.map((prop) => {
      let question1
      let question2
      let question3
      let question4
      let question5
      let question6
      let question7
      let question8
      let question9
      question1=compare(prop.question1,"IQUAL","IMPROVEMENT")
      question2=compare(prop.question2,"IQUAL","IMPROVEMENT")
      question3=compare(prop.question3,"IQUAL","IMPROVEMENT")
      question4=compare(prop.question4,"IQUAL","IMPROVEMENT")
      question5=compare(prop.question5,"IQUAL","IMPROVEMENT")
      question6=compare(prop.question6,"IQUAL","IMPROVEMENT")
      question7=compare(prop.question7,"IQUAL","IMPROVEMENT")
      question8=compare(prop.question8,"IQUAL","IMPROVEMENT")
      question9=compare(prop.question9,"IQUAL","IMPROVEMENT")

      return { 
        name: prop.name,
        question1:question1,
        question2:question2,
        question3:question3,
        question4:question4,
        question5:question5,
        question6:question6,
        question7:question7,
        question8:question8,
        question9:question9,
        ambassador: prop.ambassador,
        group: prop.group,
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
                  width: 250,
                  resizable: false,
                  sortable: false,  
                },
                {
                  Header: t("th_question1"),
                  accessor: "question1",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question2"),
                  accessor: "question2",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question3"),
                  accessor: "question3",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question4"),
                  accessor: "question4",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question5"),
                  accessor: "question5",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question6"),
                  accessor: "question6",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question7"),
                  accessor: "question7",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question8"),
                  accessor: "question8",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_question9"),
                  accessor: "question9",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_ambassador"),
                  accessor: "ambassador",
                  width: 50,
                  resizable: false,
                  sortable: false,
                },
                {
                  Header: t("th_group"),
                  accessor: "group",
                  width: 50,
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
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "name",
                        "ambassador"
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
  report_list: state.reportReducer.report_list ,
  loading: state.reportReducer.loading 
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetReports: () => dispatch( getReports() )
});

const IndexTableComponent = translate(IndexTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent);


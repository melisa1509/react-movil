import React from "react";
// react component for creating dynamic tables
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ReportSelect from "views/Select/ReportSelect.jsx";
import Table from "components/Table/Table.jsx";
import { getReportCountry } from "actions/reportActions.jsx";
import { store } from "store";

class CountryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  componentDidMount(){
      this.props.dispatchGetReportCountry("ALL");
  }
  render() {
    const {report_country, loading} = this.props;
    let { t } = this.props;
    const question = report_country.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[[t(prop.question)]]
      );
    });
    const studentPre  = report_country.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.studentsPre]
      );
    });
    const students  = report_country.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.students]
      );
    });
    const percentagePre  = report_country.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.percentagePre +"%"]
      );
    });
    const percentage = report_country.MBS.map((prop)=>{
      let TableData=[]
      return(
        TableData=[prop.percentage +"%" ]
      );
      
    });
    return (
      <GridContainer justify="center">
        <GridItem xs={12}>
          <GridContainer justify="center">
            <GridItem xs={12}>
              <ReportSelect/> 
            </GridItem> 
          </GridContainer>
        <br/> 
          <Table
              loading={loading}
              tableData={[
                [<th>Questions</th>,<th>PreEvaluations</th>," ",<th>PostEvaluations</th>," "],
                [question[0],studentPre[0], percentagePre[0],students[0],percentage[0]],
                [question[1],studentPre[1], percentagePre[1],students[1],percentage[1]],
                [question[2],studentPre[2], percentagePre[2],students[2],percentage[2]],
                [question[3],studentPre[3], percentagePre[3],students[3],percentage[3]],
                [question[4],studentPre[4], percentagePre[4],students[4],percentage[4]],
                [question[5],studentPre[5], percentagePre[5],students[5],percentage[5]],
                [question[6],studentPre[6], percentagePre[6],students[6],percentage[6]],
                [question[7],studentPre[7], percentagePre[7],students[7],percentage[7]],
                [question[8],studentPre[8], percentagePre[8],students[8],percentage[8]],
             ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      report_country: state.reportReducer.report_country,
      selected_country: state.selectReducer.selected_country,
      loading: state.reportReducer.loading 
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetReportCountry: key => dispatch( getReportCountry(key) )
});

const CountryTableComponent = translate(CountryTable);
export default connect(mapStateToProps, mapDispatchToPropsActions)(CountryTableComponent);


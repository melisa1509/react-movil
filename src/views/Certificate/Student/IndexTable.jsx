import React from "react";
// react component for creating dynamic tables

import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';
import { getCertificateList } from "actions/certificateActions.jsx";
import { showGroup } from "actions/groupActions.jsx";
import { showDate} from 'assets/functions/general.jsx';

import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import { Link } from "react-router-dom";


class IndexTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      filterAll: '',
      checked: [],
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
    this.props.dispatchGetCertificateList(this.props.match.params.id);
    this.props.dispatchShowGroup(this.props.match.params.id);
  }

 
  render() {
    const { certificate_list, active_user, show_group } = this.props;
    let { t } = this.props;
    let rol=false;  

    if(active_user.roles == "ROLE_EMBASSADOR" || active_user.roles == "ROLE_STUDENT_EMBASSADOR"){
      rol=true
    }
    
       
    const data = certificate_list.map((prop, key) => {
     let state="";
     let MBSButton=false;
     let SAButton=false;
     let labelButton = t('button_certificate_mbs');
     let linkCertificate = "https://api.interweavesolutions.org/certificate/mbs/student/";
     let date = t("label_unavailable");
     
        if (prop.group !== undefined){
          if(prop.group.program === "option.program4"){
            labelButton =  t('button_certificate_mbs_jr');
            linkCertificate = "https://api.interweavesolutions.org/certificate/jr/student/";
          }          
        }
        if(prop.student.programmbs !== undefined){
          if(prop.student.programmbs.state == 'state.approved'){
            MBSButton=true;
            date = showDate(prop.student.programmbs.approval_date);
          }
        }
        if(prop.student.programsa !== undefined){
          state=t("label_project_ambassador")+ " " + t(prop.student.programsa.state)
          if(prop.student.programsa.state == 'state.approved'){
            SAButton=true;
          }
               
        }
        else if(prop.student.programmbs !== undefined){
          state=t("label_project_mbs")+ " " + t(prop.student.programmbs.state)
          if(prop.student.programmbs.state == 'state.approved'){
            MBSButton=true;
          }
        }
        else {
          state=t("label_project_mbs")+ " " + t("state_without_starting")
        }
 
      return {
        id: key, 
        full_name: prop.student.first_name + " " + prop.student.last_name,
        status:state,
        date: date,
        MBScertificate: (
          <div className="actions-left">   
          {MBSButton 
          ?    
            <Button
              size="sm"
              color="info"
              href={linkCertificate + prop.student.id}
              target="_blank"
            >
              {labelButton}
            </Button>
          :
           t("label_not_available")
          }      
          </div>
        ),
        SAcertificate:(
          <div className="actions-left">
          {SAButton ?
          <Button
            size="sm"
            color="success"
            href={"https://api.interweavesolutions.org/certificate/ambassador/student/" + prop.student.id}
            target="_blank"
          >
            {t('button_certificate_ambassador')}
          </Button>
          :
            t("label_not_available")
          }
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
              hover
              columns={[
                {
                  Header: t("th_name"),
                  accessor: "full_name",
                  resizable: false,
                  width: 250,
                },
                {
                  Header: t("th_status"),
                  accessor: "status",
                  resizable: false,
                  width: 200,
                },
                {
                  Header: t("th_approval_date"),
                  accessor: "date",
                  resizable: false,
                  width: 150,
                },
                {
                  Header: t("th_certificate_mbs"),
                  accessor: "MBScertificate",
                  width: 200
                },
                {
                  Header: t("th_certificate_ambassador"),
                  accessor: "SAcertificate",
                  width: 250,
                  filterable: false,
                
                },
                {
                  Header: "",
                  id: 'all',
                  width: 0,
                  resizable: false,
                  sortable: false,

                  getProps: () => {
                    return {
                      style: {height: "40px"}
                    }
                  },
                  filterMethod: (filter, rows) => {
                    const result = matchSorter(rows, filter.value, {
                      keys: [
                        "full_name",
                        "status"
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
           <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <center>
                      <Link to={"/certificate"}>
                        <Button color="default" size="sm">
                        {t("button_return_to_list")}
                        </Button>
                        {" "}
                      </Link>{" "}
                      <Button
                        color="warning"
                        size="sm"
                        href={"https://api.interweavesolutions.org/certificate/attendance/list/" + this.props.match.params.id}
                        target="_blank"
                      >
                      {t("button_download_all_attendance_certificates")}
                      </Button>
                      {" "}
                      <Button
                        color="info"
                        size="sm"
                        href={"https://api.interweavesolutions.org/certificate/" + ( show_group.program === "option.program4" ? "jr" : "mbs" ) +  "/list/" + this.props.match.params.id}
                        target="_blank"
                      >
                      {t("button_download_all_mbs_certificates")}
                      </Button>
                      {" "}
                      <Button
                        color="success"
                        size="sm"
                        href={"https://api.interweavesolutions.org/certificate/ambassador/list/" + this.props.match.params.id}
                        target="_blank"
                      >
                      {t("button_download_all_ambassador_certificates")}
                      </Button>
                      {" "}
                      {rol ? "" : 
                      <Button color="danger" size="sm">
                      {t("button_approve_selected_certificates")}
                      </Button>}
                      {" "}
                      </center>
                  </GridItem>
              </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({ 
      certificate_list: state.certificateReducer.certificate_list, 
      active_user: state.loginReducer.active_user,
      show_group: state.groupReducer.show_group
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetCertificateList: (key) => dispatch( getCertificateList(key)),                 
  dispatchShowGroup: (key) => dispatch( showGroup(key))
});

const IndexTableComponent = translate(IndexTable);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent));


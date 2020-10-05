import React from "react";
// react component for creating dynamic tables

import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';
import { getCertificateList } from "actions/certificateActions.jsx";

import Create from "@material-ui/icons/Create";
import Visibility from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";

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
  }

 
  render() {
    const { certificate_list } = this.props;
    let { t } = this.props;
    const data = certificate_list.map((prop, key) => {
    let state="";
    let labelButton = t('button_mbs');
    let colorButton = "success";

    if (prop.group !== undefined){
        if(prop.group.program === "option.program4"){
          labelButton =  t('button_mbs_jr');
          colorButton =  "warning";
        }          
    }
    if(prop.student.programsa !== undefined){
      state=t("label_project_ambassador")+ " " + t(prop.student.programsa.state)
    }
    else if(prop.student.programmbs !== undefined){
      state=t("label_project_mbs")+ " " + t(prop.student.programmbs.state)
    }
    else {
      state=t("label_project_mbs")+ " " + t("state_without_starting")
    }
    let buttonMbs = false;
    let buttonSa = false;
    let idMbs = "";
    let idSa = "";
    if (prop.student.programsa !== undefined) {
          buttonSa =  true;
          idSa = prop.student.programsa.id;
          
    }
    if(prop.student.programmbs !== undefined){
          buttonMbs =  true;
          idMbs = prop.student.programmbs.id;
    }
       
      return {
        id: key, 
        full_name: prop.student.first_name + " " + prop.student.last_name,
        status:state,
        projects: (
          <div className="actions-left">
            <Link to={buttonMbs ? prop.student.programmbs.modality === "option.modality1" ? "/programmbs/showfile/" + idMbs : "/programmbs/show/" + idMbs: "#"}>
              <Button
                size="sm"
                color={buttonMbs ? colorButton : "default" }
              >
                {labelButton}
              </Button>
            </Link>
            {" "}
            <Link to={buttonSa ? "/programsa/show/" + idSa : "#"}>
              <Button
                size="sm"
                color={buttonSa ? "info" : "default" }
              >
                {t('button_embassador')}
              </Button>
            </Link>
            
          </div>
        ),
        actions:(
          <div className="actions-left">
          <Link to={"/student/show/" + prop.student.id}>
            <Button
              justIcon
              round4
              simple
              color="info"
            >
              <Visibility />
            </Button>
          </Link>{" "}
          <Link to={"/student/edit/" + prop.student.id}>
            <Button
              justIcon
              round
              simple             
              color="warning"
            >
              <Create />
            </Button>
          </Link>{" "}
          <Link to={"/student/show/" + prop.student.id}>
            <Button
              justIcon
              round
              simple            
              color="danger"
            >
              <Close />
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
              hover
              columns={[
                {
                  Header: t("th_name"),
                  accessor: "full_name",
                },
                {
                  Header: t("th_status"),
                  accessor: "status",
                },
                {
                  Header: t("th_projects"),
                  accessor: "projects",
                },
                {
                  Header: t("th_actions"),
                  accessor: "actions",
                  sortable: false,
                  width:200
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
                      <Link to={"/group"}>
                        <Button color="default" size="sm">
                        {t("button_return_to_list")}
                        </Button>
                        {" "}
                      </Link>{" "}
                      <Button color="warning" size="sm">
                      {t("button_export_list")}
                      </Button>
                      {" "}
                      <Link to={"/student/new/" + this.props.match.params.id}>
                      <Button color="info" size="sm">
                      {t("button_create_new")}
                      </Button>
                      </Link>
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
      active_user: state.loginReducer.active_user
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetCertificateList: (key) => dispatch( getCertificateList(key))
});

const IndexTableComponent = translate(IndexTable);
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent));


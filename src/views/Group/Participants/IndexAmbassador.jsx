import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables

import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { connect } from "react-redux";
import { translate } from 'react-switch-lang';
import { withRouter } from 'react-router-dom';
import { getCertificateList } from "actions/certificateActions.jsx";
import { uploadImageAlert } from "actions/groupActions.jsx";
import { showEvaluationPre } from "actions/evaluationActions.jsx";
import { showEvaluationPost } from "actions/evaluationActions.jsx";
import { evaluationPre } from "actions/evaluationActions.jsx";
import { evaluationPost } from "actions/evaluationActions.jsx";
import { deleteAlert } from "actions/evaluationActions.jsx";
import { deleteImageAlert } from "actions/groupActions.jsx";
import { deleteSuccessful } from "actions/generalActions.jsx";
import { uploadImage } from "actions/groupActions.jsx";

import SweetAlert from "react-bootstrap-sweetalert";
import UploadForm from './UploadForm.jsx';
import PreForm from './PreForm.jsx';
import PostForm from './PostForm.jsx';

import Create from "@material-ui/icons/Create";
import withStyles from "@material-ui/core/styles/withStyles";
import Visibility from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";

// core components
import Warning from "components/Typography/Warning.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import { Link } from "react-router-dom";

const styles = {
  scroll: {
    overflowY: "scroll",
    display: "block",
    width: "450px",
    height: "700px",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    alignItems: "left",
    justifyContent: "left",
  },
  button:{
    position:"center"
  },
  ...sweetAlertStyle
};

class IndexTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert:null,
      show: false,
      filtered: [],
      filterAll: '',
      checked: [],
    };
    this.filterAll = this.filterAll.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.imageAlert = this.imageAlert.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.evaluationPreAlert = this.evaluationPreAlert.bind(this);
    this.evaluationPostAlert = this.evaluationPostAlert.bind(this);
    this.evaluationPre = this.evaluationPre.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
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

  imageAlert(key){
    this.props.dispatchUploadImageAlert(key);
  }
  
  uploadImage(){
    this.props.dispatchUploadImage();
  }
  evaluationPreAlert(key){
    this.props.dispatchShowEvaluationPre(key);
  }

  evaluationPostAlert(key){
    this.props.dispatchShowEvaluationPost(key);
  }

  evaluationPre(){
    this.props.dispatchEvaluationPre();
  }

  evaluationPost(){
    this.props.dispatchEvaluationPost();
  }
  deleteClick(){
    this.props.dispatchDeleteSuccessful();
  }

  deleteAlert(){
    this.props.dispatchDeleteAlert();
    this.props.dispatchDeleteSuccessful();
    this.props.dispatchDeleteImageAlert();
    this.props.dispatchGetCertificateList(this.props.match.params.id);
  }
 
  render() {
    const { certificate_list, image_alert, pre_alert,post_alert, successfull_edit, classes} = this.props;
    let { t } = this.props;
    let id_student=""
    let approved = certificate_list.filter(prop => prop.student.programmbs == undefined || prop.student.programmbs.modality == "option.modality1" )
    const data = approved.map((prop, key) => {
      let buttonMbs = false;
      let buttonEvaluationPre =false
      let buttonEvaluationPost =false

      if(prop.student.evaluation !== undefined){
        buttonEvaluationPre =true
          if(prop.student.evaluation.postquestion1 !== undefined){
            buttonEvaluationPost =true
          } 
      }
      if(prop.student.programmbs !== undefined){
          if(prop.student.programmbs.filestudent !== undefined){
            buttonMbs =  true
        } 
      }
      return {
        id: key, 
        full_name:prop.student.first_name + " " + prop.student.last_name,
        evaluation:(
          <div className="actions-left">
              <Button
                onClick={() => this.evaluationPreAlert(prop.student.id)}
                size="sm"
                color={buttonEvaluationPre==true ? "default" : "warning" }
              >
                {t('button_pre_evaluation')}
              </Button>
              <Button
                onClick={()=> this.evaluationPostAlert(prop.student.id)}
                size="sm"
                color={buttonEvaluationPost==true ? "default" : "warning" }
              >
                {t('button_post_evaluation')}
              </Button>
          </div>
        ),
        projects: (
          <div className="actions-left">
              <Button
                onClick={() => this.imageAlert(prop.student.id)}
                size="sm"
                color={buttonMbs==true ? "default" : "warning" }
              >
                {t('button_mbs')}
              </Button>
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
            {image_alert ? 
              <SweetAlert
                  style={{ display: "block", marginTop: "-100px" }}
                  onConfirm={() => this.uploadImage()}
                  onCancel={() => this.deleteAlert()}
                  confirmBtnText={t("button_save")}
                  cancelBtnText={t("button_close")}
                  showCancel
                  confirmBtnCssClass={
                      this.props.classes.button + " " + this.props.classes.success
                  }
                  cancelBtnCssClass={
                    this.props.classes.button + " " + this.props.classes.default
                  }
                  >
                  <h4>{t("title_upload_mbs")}</h4>
                  <Warning>{t("label_compress_file")}</Warning>
                  <br/>
                  <UploadForm/>
                  <GridItem xs={12} sm={12} md={12}>
                    { successfull_edit ?      
                      <SweetAlert
                      success
                      style={{ display: "block", marginTop: "-100px", close:true }}
                      onConfirm={() => this.deleteClick()}
                      confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                      }
                      confirmBtnText={t("button_continue")}
                      >
                      <h4>{t("label_save_success")}</h4>
                    </SweetAlert>  
                    : ""}
                  </GridItem>
              </SweetAlert>
            : ""}
             {pre_alert ? 
              <SweetAlert
                style={{ display: "block", marginTop: "-300px", close:true}}
                onConfirm={() => this.evaluationPre()}
                onCancel={() => this.deleteAlert()}
                confirmBtnCssClass={
                    this.props.classes.button + " " + this.props.classes.success 
                }
                cancelBtnCssClass={
                  this.props.classes.button + " " + this.props.classes.default
                }
                confirmBtnText={t("button_save")}
                cancelBtnText={t("button_close")}
                showCancel
              >
                  <h4>{t("title_pre_evaluation")}</h4>
                  <br/>
                      <PreForm/>
                  <GridItem xs={12} sm={12} md={12}>
                    { successfull_edit ?      
                      <SweetAlert
                      success
                      style={{ display: "block", marginTop: "-100px", close:true }}
                      onConfirm={() => this.deleteClick()}
                      confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                      }
                      confirmBtnText={t("button_continue")}
                      >
                      <h4>{t("label_save_success")}</h4>
                    </SweetAlert>  
                    : ""}
                  </GridItem>
              </SweetAlert>
            : ""}
          {post_alert ? 
            <SweetAlert
                style={{ display: "block", marginTop: "-300px", close:true}}
                onConfirm={() => this.evaluationPost()}
                onCancel={() => this.deleteAlert()}
                confirmBtnCssClass={
                    this.props.classes.button + " " + this.props.classes.success 
                }
                cancelBtnCssClass={
                  this.props.classes.button + " " + this.props.classes.default
                }
                confirmBtnText={t("button_save")}
                cancelBtnText={t("button_close")}
                showCancel
                >
                <h4>{t("title_post_evaluation")}</h4>
                <br/>
                    <PostForm/>
                <GridItem xs={12} sm={12} md={12}>
                    { successfull_edit ?  
                      <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px", close:true }}
                        onConfirm={() => this.deleteClick()}
                        confirmBtnCssClass={
                          this.props.classes.button + " " + this.props.classes.success
                        }
                        confirmBtnText={t("button_continue")}
                        >
                        <h4>{t("label_save_success")}</h4>
                      </SweetAlert>     
                    : ""}
                </GridItem>
            </SweetAlert>
          : ""}
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
                  width: 250,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("th_evaluation"),
                  accessor: "evaluation",
                  width: 350,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("th_projects"),
                  accessor: "projects",
                  width: 100,
                  sortable: false,
                  filterable: false
                },
                {
                  Header: t("th_actions"),
                  accessor: "actions",
                  width: 200,
                  sortable: false,
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

IndexTable.propTypes = {
  classes: PropTypes.object
};



const mapStateToProps = state => ({ 
      initialValues: state.evaluationReducer.data,
      certificate_list: state.certificateReducer.certificate_list, 
      image_alert: state.groupReducer.image_alert,
      pre_alert: state.evaluationReducer.pre_alert,
      post_alert: state.evaluationReducer.post_alert,
      active_user: state.loginReducer.active_user,
      successfull_edit:state.generalReducer.successfull_edit,
});

const mapDispatchToPropsActions = dispatch => ({
  dispatchGetCertificateList: (key) => dispatch( getCertificateList(key)),
  dispatchUploadImageAlert: (key) => dispatch( uploadImageAlert(key)),
  dispatchUploadImage: () => dispatch( uploadImage()),
  dispatchShowEvaluationPre: (key) => dispatch( showEvaluationPre(key)),
  dispatchShowEvaluationPost: (key) => dispatch(showEvaluationPost(key)),
  dispatchEvaluationPre: () => dispatch(evaluationPre()),
  dispatchEvaluationPost: () => dispatch(evaluationPost()),
  dispatchDeleteAlert:()=> dispatch(deleteAlert()),
  dispatchDeleteSuccessful: () => dispatch(deleteSuccessful()),
  dispatchDeleteImageAlert: () => dispatch(deleteImageAlert()),
  dispatchDeleteSuccessful: ()=> dispatch(deleteSuccessful()),
});

const IndexTableComponent = translate(withStyles(styles)(IndexTable));
export default withRouter(connect(mapStateToProps, mapDispatchToPropsActions)(IndexTableComponent));


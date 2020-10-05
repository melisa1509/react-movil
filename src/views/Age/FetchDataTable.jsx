import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { connect } from "react-redux";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import TitleConected from "views/Age/TitleConected.jsx";

import { dataTable, dataTableHalf } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { translate } from "react-translate";

import { setData } from "actions/actions.jsx";


const ConnectedFetchDataTable = ({ rows, loading }) => {
    const data = rows.map((prop, key) => {
        return {
          id: key,
          name: prop.description,
          position: prop.language,
          office: prop.description,
          age: prop.language,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                justIcon
                round4
                simple
                color="info"
                className="like"
              >
                <Favorite />
              </Button>{" "}
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple            
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple            
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{" "}
            </div>
          )
        };
      })

    return (
        <ReactTable
        data={data}
        loading={loading}
        columns={[
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Position",
            accessor: "position"
          },
          {
            Header: "Office",
            accessor: "office"
          },
          {
            Header: "Age",
            accessor: "age"
          },
          {
            Header: "Actions",
            accessor: "actions",
            sortable: false,
            filterable: false
          }
        ]}
        defaultPageSize={10}
        showPaginationTop={false}
        showPaginationBottom={true}
        className="-striped -highlight"
      />
    );
}

const mapStateToProps = state => (
    { 
      rows: state.rows, 
      loading: state.loading
    }
);

export default connect(mapStateToProps)(ConnectedFetchDataTable);


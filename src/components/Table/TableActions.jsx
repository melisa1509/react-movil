import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "components/CustomButtons/Button.jsx";
// core components
import tableStyle from "assets/jss/material-kit-react/components/tableStyle.jsx";
// material-ui icons
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

function CustomTableActions({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  const simpleButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button simple justIcon size="sm" color={prop.color} key={key} href="/age">
          <prop.icon />
        </Button>
      );
    });
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.list.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell}  key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
                <TableCell className={classes.tableCell}  key={key}>
                  <Button simple justIcon size="sm" color="info" key={key} href={ "/show" + prop.component}>
                    <Person />
                  </Button>
                  <Button simple justIcon size="sm" color="success" key={key} href={ "/edit" + prop.component}>
                    <Edit />
                  </Button>
                  <Button simple justIcon size="sm" color="danger" key={key} href={ "/show" + prop.component}>
                    <Close />
                  </Button>
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTableActions.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTableActions.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTableActions);

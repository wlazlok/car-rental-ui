import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import React from "react";

const useStyles = makeStyles((theme) => ({
  box: {
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: "2%",
  },
  link: {
    textDecoration: "none",
  },
}));

const AdminProductsTable = (props) => {
  const classes = useStyles();
  const products = props.list;

  return (
    <div className={classes.box}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nazwa</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: "bold" }}
                >
                  {row.productId}
                </TableCell>
                <TableCell align="center">{row.productName}</TableCell>
                <TableCell align="right">
                  <Link
                    to={`/admin/edit/${row.productId}`}
                    className={classes.link}
                  >
                    <Button variant="outlined">Edycja</Button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="error">
                    Usuń
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminProductsTable;

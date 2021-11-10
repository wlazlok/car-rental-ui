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

import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles(() => ({
  box: {
    width: "90%",
    marginTop: "2%",
  },
  link: {
    textDecoration: "none",
  },
}));

const UsersTable = (props) => {
  const classes = useStyles();
  const users = props.list;

  return (
    <div className={classes.box}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nazwa użytkownika</TableCell>
              <TableCell align="right">Konto aktywne</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: "bold" }}
                >
                  {row.userId}
                </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="right">
                  <Checkbox checked={row.enabled} />
                </TableCell>
                <TableCell align="right">
                  <Link
                    to={`/admin/user/edit/${row.userId}`}
                    className={classes.link}
                  >
                    <Button variant="outlined">Edycja</Button>
                  </Link>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;

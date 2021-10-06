import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// 6h - podstawowa cena / 4 + 50
// 12h - podstawowa cena / 2 + 80
// poniedziałek - czwartek - podstawowa cena
// piątek niedziela - podstawowa cena * 1.2
// tydzień - podstawowa cena * 7 - podstawowa cena * 0.6
// miesiąc - podstawowa cena * 7 * 4 - 420

const PricesTable = (props) => {
  const dayPrice = props.price;
  const productName = props.name;

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "2%", backgroundColor: "#FBFBFB" }}
    >
      <Table aria-label="simple table">
        <TableBody>
          {productName && (
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                {productName}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell align="center">
              6 godzin: {dayPrice / 4 + 50} PLN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              12 godzin: {dayPrice / 2 + 80} PLN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Doba (poniedziałek - czwartek): {dayPrice} PLN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Doba (piątek - niedziela): {dayPrice * 1.2} PLN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Tydzień: {dayPrice * 7 - dayPrice * 0.6} PLN
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Miesiąc: {dayPrice * 7 * 4 - 420} PLN
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PricesTable;

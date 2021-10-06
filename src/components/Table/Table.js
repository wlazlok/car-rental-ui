import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const DetailTable = (props) => {
  const product = props.item;
  const productDetail = product.productDetails;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{product.productName}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              Rok produkcji: {productDetail.productionYear}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Silnik: {productDetail.engine}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Konie mechaniczne: {productDetail.power}KM
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Napęd: {productDetail.drive}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Skrzynia: {productDetail.gearbox}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              Limit kilometrów na dobę: {productDetail.distanceLimitPerDay}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailTable;
